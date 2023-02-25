import Dockerode, { ContainerCreateOptions } from 'dockerode';
import path from 'path';
import fs from 'node:fs';
import recursiveReadDir from 'recursive-readdir';
import { FastifyInstance } from 'fastify';
import * as config from '../config';
import stream from 'node:stream/promises';

export interface BuildImageOptions {
  fastify: FastifyInstance;
  imageName: string;
  dockerfileName: string;
}

// TODO: Move FastifyInstance in this interface and in similar places
export interface CreateAndRunOptions {
  fastify: FastifyInstance;
  containerName: string;
  imageName: string;
  containerPort?: string;
  hostPort?: string;
}

export type BuildAndRunOptions = BuildImageOptions & CreateAndRunOptions;

export const dockerService = {
  async getAllContainers(docker: Dockerode) {
    const containerInfos = await docker.listContainers();
    return containerInfos.map((info) => ({ image: info.Image }));
  },

  async buildImage(options: BuildImageOptions) {
    const { fastify, imageName, dockerfileName } = options;
    const temporaryDirectoryPath = config.temporaryDirectoryPath;
    const docker = fastify.docker;

    const tempFiles = fs.readdirSync(temporaryDirectoryPath);
    const repoDirName = tempFiles[0];

    const repoPath = path.join(temporaryDirectoryPath, repoDirName);
    const repoFiles = await recursiveReadDir(repoPath);
    const relativeRepoFiles = repoFiles.map((f) => path.relative(repoPath, f));

    fastify.log.info(`Building image from repo: ${repoPath}`);

    const dockerignorePath = path.join(repoPath, '.dockerignore');
    // If Dockerfile is in .dockerignore then you will get error "Cannot locate specified Dockerfile: Dockerfile"
    fs.appendFileSync(dockerignorePath, `\n!${dockerfileName}\n`);

    const buildStream = await docker.buildImage(
      {
        context: repoPath,
        src: relativeRepoFiles,
      },
      {
        forcerm: true,
        t: imageName,
        dockerfile: dockerfileName,
      }
    );

    return buildStream;
  },

  async createAndRun(options: CreateAndRunOptions) {
    const { fastify, containerName, containerPort, hostPort, imageName } = options;

    const docker = fastify.docker;
    const portForwardOptions: Partial<ContainerCreateOptions> = {};
    const shouldPortForward = containerPort !== undefined && hostPort !== undefined;

    if (shouldPortForward) {
      portForwardOptions.HostConfig = {
        PortBindings: {
          [`${containerPort}/tcp`]: [{ HostIp: '0.0.0.0', HostPort: hostPort }],
        },
      };
      portForwardOptions.ExposedPorts = { [`${containerPort}/tcp`]: {} };
    }

    const createContainerOptions = {
      name: containerName,
      Image: imageName,
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      ...portForwardOptions,
    };
    const container = await docker.createContainer(createContainerOptions);

    const runStream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });

    const startResult = await container.start();
    fastify.log.info(`Started container: ${startResult.toString()}`);

    return { containerId: container.id, runStream };
  },

  async buildAndRun(options: BuildAndRunOptions) {
    const { fastify, imageName, containerPort, hostPort, dockerfileName, containerName } = options;

    const socket = fastify.socketManager.get();
    const buildStream = await dockerService.buildImage({ fastify, imageName, dockerfileName });
    buildStream.on('data', (data) => {
      const message = data.toString();
      if (socket !== null) {
        socket.emit('message', message);
      }
      fastify.log.info(message);
    });

    await stream.finished(buildStream);

    const { containerId, runStream } = await dockerService.createAndRun({
      fastify,
      containerName,
      imageName,
      containerPort,
      hostPort,
    });
    runStream.on('data', (data) => {
      const message = data.toString();
      if (socket !== null) {
        socket.emit('message', message);
      }
      fastify.log.info(message);
    });

    await stream.finished(runStream);

    return containerId;
  },
};