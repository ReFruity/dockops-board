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

import * as runtime from '../runtime';
import type {
  V1ContainerAllGet200ResponseInner,
  V1ContainerNewPost200Response,
  V1ContainerNewPostRequest,
  V1UserNewPost200Response,
  V1UserNewPostRequest,
} from '../models';
import {
  V1ContainerAllGet200ResponseInnerFromJSON,
  V1ContainerAllGet200ResponseInnerToJSON,
  V1ContainerNewPost200ResponseFromJSON,
  V1ContainerNewPost200ResponseToJSON,
  V1ContainerNewPostRequestFromJSON,
  V1ContainerNewPostRequestToJSON,
  V1UserNewPost200ResponseFromJSON,
  V1UserNewPost200ResponseToJSON,
  V1UserNewPostRequestFromJSON,
  V1UserNewPostRequestToJSON,
} from '../models';

export interface V1ContainerNewPostOperationRequest {
  body?: V1ContainerNewPostRequest;
}

export interface V1UserNewPostOperationRequest {
  body?: V1UserNewPostRequest;
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI {
  /**
   */
  async v1ContainerAllGetRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<V1ContainerAllGet200ResponseInner>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/v1/container/all`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(V1ContainerAllGet200ResponseInnerFromJSON)
    );
  }

  /**
   */
  async v1ContainerAllGet(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<V1ContainerAllGet200ResponseInner>> {
    const response = await this.v1ContainerAllGetRaw(initOverrides);
    return await response.value();
  }

  /**
   */
  async v1ContainerNewPostRaw(
    requestParameters: V1ContainerNewPostOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<V1ContainerNewPost200Response>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v1/container/new`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: V1ContainerNewPostRequestToJSON(requestParameters.body),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => V1ContainerNewPost200ResponseFromJSON(jsonValue));
  }

  /**
   */
  async v1ContainerNewPost(
    requestParameters: V1ContainerNewPostOperationRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<V1ContainerNewPost200Response> {
    const response = await this.v1ContainerNewPostRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async v1UserNewPostRaw(
    requestParameters: V1UserNewPostOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<V1UserNewPost200Response>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v1/user/new`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: V1UserNewPostRequestToJSON(requestParameters.body),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => V1UserNewPost200ResponseFromJSON(jsonValue));
  }

  /**
   */
  async v1UserNewPost(
    requestParameters: V1UserNewPostOperationRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<V1UserNewPost200Response> {
    const response = await this.v1UserNewPostRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
