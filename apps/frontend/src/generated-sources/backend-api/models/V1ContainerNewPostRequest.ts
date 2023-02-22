/* tslint:disable */
/* eslint-disable */
/**
 * Dockops-board API specification
 * Dockops-board is an open source manager for docker containers with web UI
 *
 * The version of the OpenAPI document: 0.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface V1ContainerNewPostRequest
 */
export interface V1ContainerNewPostRequest {
  /**
   *
   * @type {string}
   * @memberof V1ContainerNewPostRequest
   */
  containerName: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerNewPostRequest
   */
  githubURL: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerNewPostRequest
   */
  dockerfileName?: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerNewPostRequest
   */
  hostPort?: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerNewPostRequest
   */
  containerPort?: string;
}

/**
 * Check if a given object implements the V1ContainerNewPostRequest interface.
 */
export function instanceOfV1ContainerNewPostRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'containerName' in value;
  isInstance = isInstance && 'githubURL' in value;

  return isInstance;
}

export function V1ContainerNewPostRequestFromJSON(json: any): V1ContainerNewPostRequest {
  return V1ContainerNewPostRequestFromJSONTyped(json, false);
}

export function V1ContainerNewPostRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): V1ContainerNewPostRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    containerName: json['containerName'],
    githubURL: json['githubURL'],
    dockerfileName: !exists(json, 'dockerfileName') ? undefined : json['dockerfileName'],
    hostPort: !exists(json, 'hostPort') ? undefined : json['hostPort'],
    containerPort: !exists(json, 'containerPort') ? undefined : json['containerPort'],
  };
}

export function V1ContainerNewPostRequestToJSON(value?: V1ContainerNewPostRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    containerName: value.containerName,
    githubURL: value.githubURL,
    dockerfileName: value.dockerfileName,
    hostPort: value.hostPort,
    containerPort: value.containerPort,
  };
}
