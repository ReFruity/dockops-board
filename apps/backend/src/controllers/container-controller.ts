import { getContainerAllSchema, postContainerNewSchema } from '../schema/container-schema';
import { dockerService } from '../services/docker-service';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance } from 'fastify';
import { sourceFetchService } from '../services/source-fetch-service';
import stream from 'node:stream/promises';

export async function containerController(fastify: FastifyInstance) {
  const fastifyTyped = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastifyTyped.route({
    method: 'GET',
    url: '/all',
    schema: getContainerAllSchema,
    handler: async (request, reply) => {
      const response = await dockerService.getAllContainers(fastifyTyped.docker);
      reply.send(response);
    },
  });

  fastifyTyped.route({
    method: 'POST',
    url: '/new',
    schema: postContainerNewSchema,
    handler: async (request, reply) => {
      const githubURL = request.body.githubURL;
      const imageName = 'tempimage';
      const containerName = request.body.containerName ?? 'tempcontainer';
      const dockerfileName = request.body.dockerfileName ?? 'Dockerfile';
      const { containerPort, hostPort } = request.body;

      await sourceFetchService.extractZipFromGithub(fastify, githubURL);

      const buildStream = await dockerService.buildImage(fastify, { imageName, dockerfileName });
      buildStream.on('data', (data) => fastify.log.info(data.toString()));
      await stream.finished(buildStream);

      const socket = fastify.socketManager.get();
      const { containerId, runStream } = await dockerService.createAndRun(fastify, {
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

      reply.send({ containerId });
    },
  });
}
