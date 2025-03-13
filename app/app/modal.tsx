import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import Button from "@/src/components/button";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useQuestion } from "@/src/context/question";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { addCourse, getAllCourses, updateCourse } from "@/src/database/courses";

interface Form {
  name: string;
  images: File[];
  category: {
    name: string;
    description: string;
    color: string;
  } | null;
  price: number;
  currency: string;
  owner: "DEBUG";
}

export default function Modal() {
  const db = useSQLiteContext();
  const database = drizzle(db)
  const { getYoutube, setCourses } = useQuestion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [responseimage, setResponse] = useState<string>("message:");
  const [processing, setProcessing] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-expect-error
  const imagePath = route.params?.imagePath || null;
  const router = useRouter();
  const [formData, setFormData] = useState<Form>({
    name: "",
    images: [],
    category: null,
    price: 0,
    currency: "ZAR",
    owner: "DEBUG",
  });

  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [youtubeError, setYoutubeError] = useState<string>("");

  // Simple regex to validate common YouTube URL forms
  const validateYoutubeLink = (link: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/;
    return regex.test(link);
  };

  const handleSubmit = async () => {
    setProcessing(true);
    // Optionally include YouTube link validation before processing the form
    if (youtubeLink && !validateYoutubeLink(youtubeLink)) {
      setYoutubeError("Please enter a valid YouTube link.");
      return;
    }

    const response = await getYoutube(youtubeLink);
    
    if(!response) {
      router.dismiss()
      setProcessing(false);
    };

    const {_id: uuid, status, youtube} = response;
    
    /*
    if(status==="successful"){
      try{
        await addCourse({
          db: database,
          uuid,
          youtube,
          status
        });

        //@ts-ignore
        const { segments } = response;

        const { authorName, category, title, totalPoints } = segments;

        await updateCourse({
          db: database,
          status: status,
          title,
          authorName,
          category,
          totalPoints,
          uuid,
          segments:  segments,
        });


        const allRows = await getAllCourses({db: database});
        setCourses(allRows);
      } catch(error){
        console.log(error);
      }
    }else{
      try{
        await addCourse({
          db: database,
          uuid,
          youtube,
          status
        });

        const allRows = await getAllCourses({db: database});
        setCourses(allRows);
      } catch(error){
        console.log(error);
      }
    }
    */
    
    router.dismiss()
    setProcessing(false);
  };

  useEffect(() => {
    if (imagePath) {
      setFormData({ ...formData, images: [imagePath] });
    }
  }, [imagePath]);

  useEffect(() => {
    (async () => {
      if (!isEnabled) return null;
    })();
  }, [isEnabled]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          <Text style={styles.title}>{"Add Course"}</Text>
          
          {/* New TextInput for YouTube Link */}
          <Text style={styles.label}>YouTube Link</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter YouTube URL"
            value={youtubeLink}
            onChangeText={(value) => {
              setYoutubeLink(value);
              if (value === "" || validateYoutubeLink(value)) {
                setYoutubeError("");
              } else {
                setYoutubeError("Please enter a valid YouTube link.");
              }
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {youtubeError ? <Text style={styles.error}>{youtubeError}</Text> : null}

          <Button processing={processing} onPress={handleSubmit} title="Add" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  price: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  imageInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.2)",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
    height: 200,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    height: 350,
    marginBottom: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  changeImageButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 5,
  },
  changeImageText: {
    color: "white",
    fontSize: 14,
  },
});