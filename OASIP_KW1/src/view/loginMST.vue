<script setup>
import { UserAgentApplication } from "msal" ;

const msalConfig = {
    auth: {
        clientId: "0cab0fb2-c58a-4e96-abd0-037c359d78b5",
        authority: "https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d",
        redirectURI: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true,
        popUp:true // Set this to "true" if you are having issues on IE11 or Edge
    }
};


var requestObj = {
    scopes: ["user.read"]
};

var myMSALObj = new UserAgentApplication(msalConfig);

var login = async () => {
    var authResult = await myMSALObj.loginPopup(requestObj);
    return authResult.account;
};

var getAccount = async () => {
    var account = await myMSALObj.getAccount();
    return account;
};

var logoff = () => {
    myMSALObj.logout();
};
</script>
 
<template>

</template>
 
<style>

</style>