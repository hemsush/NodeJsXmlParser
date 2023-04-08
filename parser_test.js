import { XMLParser } from 'fast-xml-parser';

//xml data
var xmldata = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope"><env:Header/><env:Body><n0:Z_CDMEMOCFMResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">' +
	'<E_NUM1>1</E_NUM1><E_NUM2>1</E_NUM2><IT_CREDIT>' +
	'<item><GJAHR>0000</GJAHR><AUGDT>0000-00-00</AUGDT><AUGBL/><PSWBT>0.0</PSWBT><PSWSL/></item>' +
	'<item><GJAHR>2023</GJAHR><AUGDT>0000-00-00</AUGDT><AUGBL/><PSWBT>90.56</PSWBT><PSWSL>EUR</PSWSL></item>' +
	'<item><GJAHR>2023</GJAHR><AUGDT>0000-00-00</AUGDT><AUGBL/><PSWBT>90.56</PSWBT><PSWSL>EUR</PSWSL></item></IT_CREDIT>' +
	'<IT_DEBIT><item><GJAHR>0000</GJAHR><AUGDT>0000-00-00</AUGDT><AUGBL/><PSWBT>0.0</PSWBT><PSWSL/></item>' +
	'<item><GJAHR>2023</GJAHR><AUGDT>0000-00-00</AUGDT><AUGBL/><PSWBT>90.56</PSWBT><PSWSL>EUR</PSWSL></item>' +
	'<item><GJAHR>2023</GJAHR><AUGDT>0000-00-00</AUGDT><AUGBL/><PSWBT>90.56</PSWBT><PSWSL>EUR</PSWSL></item>' +
	'</IT_DEBIT></n0:Z_CDMEMOCFMResponse></env:Body></env:Envelope>';

const parser = new XMLParser();
const jsonData = parser.parse(xmldata);
const debitItems = jsonData['env:Envelope']['env:Body']['n0:Z_CDMEMOCFMResponse']['IT_DEBIT']['item']
const creditItems = jsonData['env:Envelope']['env:Body']['n0:Z_CDMEMOCFMResponse']['IT_CREDIT']['item']

var creditDebitData = {
	debit: [],
	credit: []
};

for (var i in debitItems) {
	var items = debitItems[i];
	creditDebitData.debit.push({
		"fiscal_year": items.GJAHR,
		"clearing_dt_info": items.AUGDT,
		"clearing_doc_info": items.AUGBL,
		"ledger_amt": items.PSWBT,
		"ledger_currency": items.PSWSL
	});
}

for (var i in creditItems) {
	var items = creditItems[i];
	creditDebitData.credit.push({
		"fiscal_year": items.GJAHR,
		"clearing_dt_info": items.AUGDT,
		"clearing_doc_info": items.AUGBL,
		"ledger_amt": items.PSWBT,
		"ledger_currency": items.PSWSL
	});
}

console.log("final json");
console.log(creditDebitData);
