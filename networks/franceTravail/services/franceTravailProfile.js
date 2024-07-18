export const franceTravailNormalizer = (profile) => {
    // Assume phone numbers are in profile.phone as a string
    let phoneNumbers = profile.phone;

    // If phone numbers are in a string, convert it to an array
    if (typeof phoneNumbers === 'string') {
        // Remove all spaces and split the string into groups of 10 digits
        phoneNumbers = phoneNumbers.replace(/\s+/g, '').match(/.{1,10}/g);
    }

    // Filter phone numbers to keep only those starting with 06 or 07
    const validPhoneNumbers = phoneNumbers.filter(number => /^0[67]/.test(number));

    // Use the first valid phone number, if available
    const primaryPhoneNumber = validPhoneNumbers.length > 0 ? validPhoneNumbers[0] : '';

    const normalizedProfile = {
        networkIdContext: profile.FTID,
        fullname: profile.fullname,
        phone: primaryPhoneNumber,
        networks: [{
            name: "France Travail",
            id: profile.FTID
        }]
    };

    return normalizedProfile;
};
