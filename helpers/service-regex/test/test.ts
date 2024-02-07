import { ServiceRegex } from '../src';

setTimeout(async () => {
    try {
        console.log(ServiceRegex.isEmail('ss@dd.cc'));
        console.log(ServiceRegex.email());

        console.log(ServiceRegex.isUrl(''));
        console.log(ServiceRegex.url());

        console.log(ServiceRegex.isRTSP(''));
        console.log(ServiceRegex.rtsp());

        console.log(ServiceRegex.isHostname(''));
        console.log(ServiceRegex.hostname());

        console.log(ServiceRegex.isInt(''));
        console.log(ServiceRegex.intNumber());

        console.log(ServiceRegex.isFloat(''));
        console.log(ServiceRegex.floatNumber());

        console.log(ServiceRegex.isInternationalPhone(''));
        console.log(ServiceRegex.internationalPhone());

        console.log(ServiceRegex.isIp(''));
        console.log(ServiceRegex.ip());

        console.log(ServiceRegex.isPort(''));
        console.log(ServiceRegex.port());

        console.log(ServiceRegex.isMacAddress(''));
        console.log(ServiceRegex.macAddress());

        console.log(ServiceRegex.isLatitude(''));
        console.log(ServiceRegex.isLongitude(''));

        console.log(ServiceRegex.isHtmlTag(''));
        console.log(ServiceRegex.htmlTag());

        console.log(ServiceRegex.isTrueString(''));
        console.log(ServiceRegex.trueString());

        console.log(ServiceRegex.isNric4(''));
        console.log(ServiceRegex.nric4());

        console.log(ServiceRegex.isAccount(''));
        console.log(ServiceRegex.account());

        console.log(ServiceRegex.isPassword(''));
        console.log(ServiceRegex.password());

        console.log(ServiceRegex.isStrongPassword(''));
        console.log(ServiceRegex.strongPassword());

        console.log(ServiceRegex.hasBrackets(''));
        console.log(ServiceRegex.brackets());

        console.log(ServiceRegex.isLicense(''));
        console.log(ServiceRegex.license());

        console.log(ServiceRegex.isCameraName(''));
        console.log(ServiceRegex.cameraName());

        console.log(ServiceRegex.isExtensionJpg(''));
        console.log(ServiceRegex.extensionJpg());

        console.log(ServiceRegex.isExtensionPng(''));
        console.log(ServiceRegex.extensionPng());

        console.log(ServiceRegex.isExtensionPdf(''));
        console.log(ServiceRegex.extensionPdf());

        console.log(ServiceRegex.isExtensionXlsx(''));
        console.log(ServiceRegex.extensionXlsx());

        console.log(ServiceRegex.trim('  123  '));

        console.log(ServiceRegex.isHeaderKey('abc123-_|'));
        console.log(ServiceRegex.headerKey());
    } catch (e) {
        console.error(e);
    }
}, 0);
