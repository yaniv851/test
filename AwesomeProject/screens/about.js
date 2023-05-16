import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';
export default function About() {
  const [showView1, setShowView1] = useState(false);
  const [showView2, setShowView2] = useState(false);
  const [showView3, setShowView3] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
      axios.get('http://10.100.102.23:3002/api/users')
          .then(response => {
              setUsers(response.data);
          })
          .catch(error => {
              console.log(error);
          });
  }, []);

  console.log('users:', users);

  const handleTouchableOpacity1Click = () => {
    setShowView1(true);
  };

  const handleTouchableOpacity2Click = () => {
    setShowView2(true);
  };

  const handleTouchableOpacity3Click = () => {
    setShowView3(true);
  };
  const [loaded] = useFonts({
    DanaYadAlefAlefAlef: require("../assets/fonts/DanaYadAlefAlefAlef-Normal.ttf"),
  })

  if (!loaded) {
    return null;
  }

  const animatedValue = new Animated.Value(0);

  const opacityAnimation = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  });

  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 25, fontFamily: 'DanaYadAlefAlefAlef' }}>אז מי אנחנו?</Text>
      <Text>
        חממות יזמות לנוער היא קהילת הבית של היזמים החברתיים הצעירים של ישראל. אנו פזורים בין עשרות מוקדים ברחבי הארץ המכשירים את יזמי המחר למשימת חייהם: שינוי המרחב הציבורי בישראל לטובה.
        מטרתנו היא שכל אחד מכם יצליח להקים מיזם חברתי פועל, רווחי ותורם לקהילה.
      </Text>

      <Text style={{ marginBottom: 20 }} >
        אז איך אנחנו עושים את זה?
      </Text>

      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ScrollView style={{ flexDirection: 'column' }} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={handleTouchableOpacity1Click}
            style={{
              borderRadius: 150,
              width: 250,
              height: 150,
              marginBottom: 20,
              backgroundColor: '#D36B0D',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              shadowColor: '#000',
              shadowRadius: 100,
              shadowOffset: { width: 20, height: 20 },
            }}>
            <Text style={{ color: 'white' }}>
              חממות יזמות
            </Text>
          </TouchableOpacity>

          {showView1 &&
            <Animated.View
              style={{
                width: 250,
                opacity: animatedValue,
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>
                תהליכים פרונטליים בהם נצרף לכם מנטור- מומחה בתחום בו אתם רוצים ליזום, נלמד אתכם את כל הכלים שיזם חברתי צריך לדעת, ונפיק יחד איתכם תוצרים מעשיים- תוכנית עבודה, מצגת משקיעים, וובינר פתיחה למיזם שלכם ופיילוט בקהילה. תוכלו להצטרף לחממות הקרובות בלשונית "חממות יזמות קרובות"
              </Text>
            </Animated.View>
          }

          <TouchableOpacity
            onPress={handleTouchableOpacity2Click}
            style={{
              borderRadius: 150,
              width: 250,
              height: 150,
              backgroundColor: '#D36B0D',
              justifyContent: 'center',
              marginBottom: 30,
              alignItems: 'center',
              elevation: 10,
              shadowColor: '#000',
              shadowRadius: 100,
              shadowOffset: { width: 20, height: 20 },
            }}>
            <Text style={{ color: 'white' }}>
              קורסים דיגיטליים
            </Text>
          </TouchableOpacity>

          {showView2 &&
            <Animated.View style={{ width: 250, opacity: animatedValue, marginBottom: 20 }}>
              <Text>
                הקלטנו לכם קורסים דיגיטליים שיתאימו לרמה היזמית שלכם: מתחילים ומתקדמים. תוכלו ללמוד על יזמות חברתית בקצב שלכם, וליישם את התרגילים מכל מקום בעולם.
                אל דאגה- אנחנו מלווים אתכם לאורך כל הדרך!
                תוכלו ליצור קשר עם המנטורים שלנו באזור הלמידה שלכם והם יוכלו לענות לכם על השאלות אונליין.
              </Text>
            </Animated.View>
          }

          <TouchableOpacity
            onPress={handleTouchableOpacity3Click}
            style={{
              borderRadius: 150,
              width: 250,
              height: 150,
              backgroundColor: '#D36B0D',
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              shadowColor: '#000',
              shadowRadius: 100,
              shadowOffset: { width: 20, height: 20 },
            }}>
            <Text style={{ color: 'white' }}>
              YAZAM-AIM- הרשת
            </Text>
          </TouchableOpacity>

          {showView3 &&
            <Animated.View style={{ width: 250, opacity: animatedValue, marginBottom: 20 }}>
              <Text>
                מאפשרת לכל צעיר/ה בישראל לתרגל בזמן אמת את הכישורים החינמיים שלנו החברתית שלנו
                בכל פינה ברשת החברתית שלנו תוכלו למצוא תחנה שתסייע לכם לצבור עוד אחד מהכישורים החשובים ליזמים צעירים. לסרטון תוכלו להגיב- ולשתף את התוצר האישי שלכם. הצלחתם? נפלא! המשתתפים יוכלו לדרג אתכם ולאפשר לכם לצבור כוכבים. את הכוכבים הללו תוכלו להמיר למטבעות וירטואלים באפליקציה שלנו, ולרכוש עוד ועוד כלים (כן, גם בתשלום!) שיעזרו לכם לשנות את העולם.

                זכרו- השמיים הם לא הגבול!
                נשמח לשמוע מכם כל הצעה שתעזור לכם לקבל עוד ועוד כלים, כדי לשנות את העולם.
                כתבו לנו עכשיו בלשונית "צור קשר".
              </Text>
            </Animated.View>
          }
        </ScrollView>
      </View>

    </View>
  )
}