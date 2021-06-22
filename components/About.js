import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity,ToastAndroid } from "react-native";
const Kaidao = require("../assets/ic_launcher.png");
const Gan = require("../assets/Gans_profile.png");
const Pap = require("../assets/Paps_profile.png");
const Xang = require("../assets/Xangs_profile.png");
const Fb = require("../assets/Facebook_page.png");


export default function About() {

  const onPressLinking = () => {
    ToastAndroid.show("ກຳລັງດຳເນີນການ...", ToastAndroid.SHORT);
    setTimeout(()=> {
      Linking.openURL('https://www.facebook.com/KaiDaoDev-108090754832212')
    },2000)
  }

  return (
    <View style={styles.container}>
      <ScrollView styles={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            paddingBottom: 50,
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            resizeMode="stretch"
            source={Kaidao}
          />
          <Text style={{fontFamily: 'Defago', fontSize: 17, color: '#4b4b4bc3'}}>Version: 1.0.0</Text>
          <Text style={styles.title}>ໄຂ່ດາວ</Text>
          <Text style={styles.paragraph}>
            ເປັນແອັບທີ່ຮວບຮ່ວມເອົາສູດອາຫານລາວທີ່ທຸກຄົນສາມາດ ເຮັດຕາມໄດ້ ແລະ
            ລວມເຖິງອາຫານປະເທດເພື່ອນບ້ານທີ່ຄົນລາວນິຍົມ.
          </Text>

      
          <Text style={styles.title}>ພັດທະນາໂດຍ</Text>

          {/* Gan */}
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <Image style={styles.profile} resizeMode="contain" source={Pap} />
            <View style={{ marginLeft: 10, justifyContent: "center" }}>
              <Text style={styles.paragraph}>ທ.ທະນູທອງ ນັນທາວົງ</Text>
              <Text style={styles.paragraph}>ຄວທ, ການພັດທະນາເວັບໄຊ</Text>
            </View>
          </View>
          {/* Gan */}
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <Image style={styles.profile} resizeMode="contain" source={Xang} />
            <View style={{ marginLeft: 10, justifyContent: "center" }}>
              <Text style={styles.paragraph}>ທ.ອາຫຼຽງ ແກ້ວລະນີ</Text>
              <Text style={styles.paragraph}>ຄວທ, ການພັດທະນາເວັບໄຊ</Text>
            </View>
          </View>
          {/* Gan */}
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <Image style={styles.profile} resizeMode="contain" source={Gan} />
            <View style={{ marginLeft: 10, justifyContent: "center" }}>
              <Text style={styles.paragraph}>ທ.ໄຊປັນຍາ ພົງສາ</Text>
              <Text style={styles.paragraph}>ຄວທ, ການພັດທະນາເວັບໄຊ</Text>
            </View>
          </View>

          <Text style={styles.title}>ຕິດຕາມພວກເຮົາໄດ້ທີ່</Text>

          {/* Facebook Page */}
         <TouchableOpacity onPress={()=> onPressLinking()}>
         <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <Image style={{width: 70, height: 70}} resizeMode="contain" source={Fb} />
          </View>
         </TouchableOpacity>
         <Text style={{fontFamily: 'Defago', fontSize: 17, color: '#4b4b4bc3', marginBottom: 50}}>Facebook/KaiDao.Dev</Text>



          <Text style={styles.title}>ຂອບໃຈແຫຼ່ງຂໍ້ມູນ</Text>
          

          <View style={{paddingLeft: 5}}>
<Text style={styles.credit}>- ປື້ມແບບຮຽນ ວິຊາການເຮືອນ ມ 5</Text>
<Text style={styles.credit}>- ປື້ມແບບຮຽນ ວິຊາການເຮືອນ ມ 6</Text>
<Text style={styles.credit}>- http://omni-recipes.com</Text>
<Text style={styles.credit}>- https://www.happyfresh.co.th</Text>
<Text style={styles.credit}>- https://sistacafe.com</Text>
<Text style={styles.credit}>- https://www.ay-sci.go.th</Text>
<Text style={styles.credit}>- facebook//ຄົວລາວອາຫານທຳກິນເອງ</Text>
<Text style={styles.credit}>- https://www.phakhaolao.la</Text>
<Text style={styles.credit}>- https://www.zap.la</Text>
<Text style={styles.credit}>- https://tomkai.la/</Text>
<Text style={styles.credit}>- facebook//ພື້ນບ້ານລາວ</Text>
<Text style={styles.credit}>- facebook//ບ່າວບ້ານນາ</Text>
<Text style={styles.credit}>- facebook//ກິນຫຍັງດີ ? What to Eat?</Text>
<Text style={styles.credit}>- https://www.herbtrick.com</Text>
<Text style={styles.credit}>- https://www.kubkhao.com</Text>
<Text style={styles.credit}>- https://today.line.me/th</Text>
<Text style={styles.credit}>- https://cooking.kapook.com</Text>
<Text style={styles.credit}>- facebook//ໂຕະໄມ້ພາເລດ ລາຄາຖືກ</Text>
<Text style={styles.credit}>- facebook//Spicy Kitchen Restaurant Laos</Text>
<Text style={styles.credit}>- https://www.knorr.com/</Text>
<Text style={styles.credit}>- youtube//May Laos.kitchen</Text>
<Text style={styles.credit}>- facebook//ຮ້ານອາຫານນ້ອງນ້ອຍ/Nongnoi Restaurant</Text>
<Text style={styles.credit}>- http://www.kinzapzap.com</Text>
<Text style={styles.credit}>- http://www.cpbrandsite.com</Text>
<Text style={styles.credit}>- facebook//ຂອງກິນ food by me</Text>
<Text style={styles.credit}>- https://www.noobeebee.com</Text>
<Text style={styles.credit}>- http://www.twitpic.com</Text>
<Text style={styles.credit}>- https://syr.us</Text>
<Text style={styles.credit}>- facebook//Kha-Nom-Warn</Text>
<Text style={styles.credit}>- https://cooking.kapook.com</Text>
<Text style={styles.credit}>- https://www.pinterest.com</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "Defago-Bold",
    fontSize: 20,
    marginVertical: 10,
  },
  paragraph: {
    fontFamily: "Defago",
    fontSize: 18,
  },
  profile: {
    width: 80,
    height: 80,
  },
  credit: {
    fontFamily: "Defago",
    fontSize: 15,
  },
});
