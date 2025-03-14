import * as React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const PostCodeModal = ({ setZipcode, setAddress, open, close }) => {
    if(!open) return null;

    const complete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `,${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? `,${extraAddress}` : '');
        }
        console.log(data);

        setZipcode(data.zonecode);
        setAddress(fullAddress);
        close()
    }

    return (
        <div>
            <DaumPostcodeEmbed
                autoClose
                onComplete={complete}
            />
        </div>
    )
}

export default PostCodeModal;