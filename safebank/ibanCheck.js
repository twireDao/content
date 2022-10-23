
function isValidIban(ibanID) {
    messageInvalidIban = "#not-a-valid-" + ibanID
    messageNotAPartnerIban = "#not-a-parner-" + ibanID

    iban = document.getElementById(ibanID).value;

    [isIban, includedInBlz] = isSparkasseIban(iban)

    if (!isIban) {
        document.querySelector(messageInvalidIban).style.display = "block";
        return false
    } else if (!includedInBlz) {
        document.querySelector(messageNotAPartnerIban).style.display = "block";
        return false
    }

    return true

}

function isSparkasseIban(iban) {

    var germanDigits = 22
    var bankleizahlen = [
        "44050199",
        "44152490",
        "44551210",
        "45450050",
        "45451060",
        "45251480"
    ]

    const countryCode = iban.substring(0, 2)
    const checkDigits = iban.substring(2, 4)
    const blz = iban.substring(4, 12)
    const accountNumber = iban.substring(12)

    if (iban.length != germanDigits) {
        return [false, false];
    }

    // console.log("countryCode:", countryCode)
    // console.log("checkDigits:", checkDigits)
    // console.log("blz:", blz)
    // console.log("accountNumber:", accountNumber)

    checksumableIban = blz + accountNumber + (countryCode.charCodeAt(0) - 55) + (countryCode.charCodeAt(1) - 55) + checkDigits

    const isIban = (modulo97(checksumableIban) === 1)

    // console.log("checksumableIban", checksumableIban)

    // console.log(modulo97(checksumableIban))

    const includedInBlz = bankleizahlen.includes(blz);

    // console.log(isIban && includedInBlz)

    return [isIban, includedInBlz]

}

function modulo97(checksumableIban) {
    while (checksumableIban.length > 4) {
        const part = checksumableIban.substring(0, 4);
        checksumableIban = (part % 97) + checksumableIban.substring(4);
    }

    return checksumableIban % 97;
}

const selectElement = document.querySelector('#iban');

if (selectElement) {
    selectElement.addEventListener('change', function () {
        checkIban("iban")
    });
}