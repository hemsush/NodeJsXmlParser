import { XMLParser } from 'fast-xml-parser';

//xml data
var xmldata = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">' +
	'<env:Header/><env:Body>' +
	'<n0:Z_PROFILECFMResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">' +
	'<CUSTOMER_INFO><KUNNR/>' +
	'<NAME1>RN</NAME1><TELF1>1234554321</TELF1>' +
	'<STRAS>t nagar</STRAS><ORT01>chennai</ORT01><REGIO>22</REGIO><LAND1>IN</LAND1>' +
	'</CUSTOMER_INFO></n0:Z_PROFILECFMResponse>' +
	'</env:Body></env:Envelope>';

const parser = new XMLParser();
const jsonData = parser.parse(xmldata);
const customerProfile = jsonData['env:Envelope']['env:Body']['n0:Z_PROFILECFMResponse']['CUSTOMER_INFO'];

var customerData = {
	profile: []
};

customerData.profile.push({
	"id": customerProfile.KUNNR,
	"name": customerProfile.NAME1,
	"tel_no": customerProfile.TELF1,
	"street": customerProfile.STRAS,
	"city": customerProfile.ORT01,
	"postal_code": customerProfile.REGIO,
	"country": customerProfile.LAND1
})
console.log("final data::");
console.log(customerData);
