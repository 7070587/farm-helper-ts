export * from './utilitys';

export { ServiceDatetimeClass as DateTime } from 'service-datetime';
import { ServiceDatetimeClass } from 'service-datetime';
export const DateTimeService = new ServiceDatetimeClass();

export { Log } from 'server-service-log';
import { Log } from 'server-service-log';
export const LogService = new Log();
LogService.logPath = 'logs';
LogService.logFileName = `${DateTimeService.toString(new Date(), 'YYYYMMDDHHmmss')}-{{type}}-{{date}}-{{index}}.log`;

export { Print } from 'server-service-print';
import { Print } from 'server-service-print';
export const PrintService = new Print(LogService);

export { File } from 'server-service-file';
import { File } from 'server-service-file';
export const FileService = new File();

import { Utility } from '@/../helpers/utility/utility';
import * as UtilityNamespace from '@/../helpers/utility/namespace';
export { Utility, UtilityNamespace };
export const UtilityService = new Utility();

import { ServiceRegexClass } from '@advantech/service-regex';
export { ServiceRegexClass as Regex } from '@advantech/service-regex';
export const RegexService = new ServiceRegexClass();

export * as ResolveTextService from './utility/resolve-text';
export * from './utility/ws';
