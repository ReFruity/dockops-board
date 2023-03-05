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

import type { Container } from './Container';

/**
 *
 * @export
 * @interface ContainerAllResponse
 */
export interface ContainerAllResponse extends Array<Container> {}

/**
 * Check if a given object implements the ContainerAllResponse interface.
 */
export function instanceOfContainerAllResponse(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function ContainerAllResponseFromJSON(json: any): ContainerAllResponse {
  return ContainerAllResponseFromJSONTyped(json, false);
}

export function ContainerAllResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ContainerAllResponse {
  return json;
}

export function ContainerAllResponseToJSON(value?: ContainerAllResponse | null): any {
  return value;
}
