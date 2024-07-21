import LoginButton from "@/components/LoginButton";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log("🚀 ~ onSelectAuth ~ createdSessionId:", createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <LoginButton iconName="call-outline">Continue with Phone</LoginButton>
        <LoginButton
          iconName="logo-apple"
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          Continue with Apple
        </LoginButton>
        <LoginButton
          iconName="logo-google"
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          Continue with Google
        </LoginButton>
        <LoginButton
          iconName="logo-facebook"
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          Continue with Facebook
        </LoginButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 26,
  },

  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },

  separator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
});

export default Page;
