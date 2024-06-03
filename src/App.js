import "./App.css";
import SimpleWebAuthnBrowser from "@simplewebauthn/browser";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  verifyRegistrationResponse,
  generateAuthenticationOptions,
} from "@simplewebauthn/server";

function App() {
  const generateRegistractionOptions = async () => {
    // registration
    // const userAuthenticators = {
    //   authenticators: [
    //     {
    //       credentialID: "AWJO-XvawQ4TqJsab3-L33H24DfITrdqnsCrjtZgpKNyqyIyyutlcEvcjci4Ml9KtZW8Xeo3ePlb9w8MC3PJkjs",
    //       credentialPublicKey: new Uint8Array([5, 6, 7, 8]).buffer,
    //       counter: "123456",
    //     }
    //   ],
    // };

    // const excludeCredentials = userAuthenticators.authenticators.map((a) => ({
    //   id: a.credentialID,
    //   type: "public-key",
    // }));

    const options = {
      challenge: "EzJj_WZDFDj9TlIDVv39_f39",
      rp: {
        name: "My WebAuthn Service",
        id: "localhost",
      },
      user: {
        id: "user123",
        name: "John Doe",
        displayName: "John D.",
      },
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7,
        },
      ],
      timeout: 60000,
      attestation: "direct",
      excludeCredentials: [],
      authenticatorSelection: {
        authenticatorAttachment: "cross-platform",
        requireResidentKey: false,
        userVerification: "preferred",
      },
      extensions: {},
    };
    const registraction = await startRegistration(options);
    console.log("Registraction ", registraction);

    // verification
    const verify = await verifyRegistrationResponse({
      response: registraction,
      expectedChallenge: "EzJj_WZDFDj9TlIDVv39_f39",
      expectedOrigin: "http://localhost:3000",
      expectedRPID: "localhost",
    });
    console.log("Verify? ", verify);
  };

  const login = async () => {
    const authOp = await generateAuthenticationOptions({
      // allowCredentials: {
      //   id: "EzJj_WZDFDj9TlIDVv39_f39",
      //   type: "public-key",
      // },
      rpID: "localhost",
      challenge: "EzJj_WZDFDj9TlIDVv39_f39",
      userVerification: "preferred",
      timeout: 60 * 1000 * 5,
    });

    console.log("login", authOp);

    const auth = await startAuthentication(authOp);
    console.log("LastStep? ",auth);
  };
  return (
    <div className="App">
      <button onClick={generateRegistractionOptions}>
        <h1>Register Here</h1>
      </button>
      <button onClick={login}>
        <h1>Login Here</h1>
      </button>
    </div>
  );
}

export default App;
