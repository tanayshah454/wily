import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookID:'',
        scannedStudentID:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (ID) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: ID,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const buttonState=this.state.buttonState
      if(buttonState==='bookID'){
        this.setState({
          scanned: true,
          scannedBookID:data,
          buttonState: 'normal'
        });
      }
      if(buttonState==='studentID'){
        this.setState({
          scanned: true,
          scannedStudentID:data,
          buttonState: 'normal'
        });
      }
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== 'normal' && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>

         <View>
           {/* <Image source={require('../assets/favicon.png')} style={{width:200, height:200}}/> */}
         </View>
          <View>
            <TextInput placeholder='Book ID' value={this.state.scannedBookID}/>

            
            <TouchableOpacity
            onPress={this.getCameraPermissions('bookID')}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
          </View>
          <View>
          <TextInput placeholder='Student ID' value={this.state.scannedStudentID}/>

          
          <TouchableOpacity
            onPress={this.getCameraPermissions('studentID')}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
          </View>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });