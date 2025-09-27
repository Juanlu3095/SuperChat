/**
 * https://angular.love/how-to-use-the-environment-for-specific-http-services
 */

import { InjectionToken } from "@angular/core";

export interface EnvironmentConfig {
    apiendpoint: string;
}

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>('EnvironmentConfig');