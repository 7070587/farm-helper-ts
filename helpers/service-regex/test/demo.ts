import { ServiceRegex, ServiceRegexClass } from '../src';

/////// for general use ///////
const value = '123@eee.com';
console.log(`test isEmail -> "${value}", ${ServiceRegex.isEmail(value)}`);
console.log(`test email -> "${value}", ${ServiceRegex.email().test(value)}`);

let mac = '55:22:22:22:5:44';
console.log(`test mac -> "${mac}", ${ServiceRegex.isMacAddress(mac)}`);
let password = 'A23';
console.log(`test password -> "${password}", ${ServiceRegex.isPassword(password, 'A')}`);

console.log(`test brackets -> "ss{ddd", ${ServiceRegex.hasBrackets('ssddd')}`);

console.log(`test isLicense -> "ABCDE-ABCDE-ABCDE-ABCDE-ABCDE", ${ServiceRegex.isLicense('ABCDE-ABCDE-ABCDE-ABCDE-ABCDE')}`);

console.log(`test isRTSP -> "rtsp://123.111.11.11:4444", ${ServiceRegex.isRTSP('rtsp://123.111.11')}`);

console.log(`test strong password ${ServiceRegex.isStrongPassword('Aa@123456')}`);

console.log(`test cameraName ${ServiceRegex.isCameraName('S_01')}`);

console.log(`${ServiceRegex.isInt('-1', { max: 1, min: 0 })}`);

let port = 0;
console.log(`port, ${ServiceRegex.port().test(port.toString())}`);
