import React, { Component } from 'react';
import { AppRegistry, Text, Dimensions, View } from 'react-native';
import styles from './styles';
import Camera from 'react-native-camera';
import Toast from 'react-native-whc-toast';

const PicturePath = "";
const UPLOAD_URL = "http://ec2-52-14-96-102.us-east-2.compute.amazonaws.com/upload";
const TOKEN = '<API KEY COMES HERE>';

export default class Reni extends Component {
    render() {
        return (
            <View style={styles.container}>
               <Camera
            ref={(cam) => {
                this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            captureTarget={Camera.constants.CaptureTarget.disk}>
                    <Toast ref="toast"/>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    <Text style={styles.capture} onPress={this.uploadPicture.bind(this)}>[UPLOAD]</Text>                   
               </Camera>
            </View>
        );
    }

    uploadPicture = () => {

        if (PicturePath) {

            // Create the form data object
            var data = new FormData();
            data.append('picture', {
                uri: PicturePath,
                name: 'reniImage.jpg',
                type: 'image/jpg'
            });

            // Create the config object for the POST
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data;',
                    'Authorization': 'Bearer ' + TOKEN,
                },
                body: data,
            }

            fetch(UPLOAD_URL, config)
                .then((responseData) => {
                    // Show response form the server                    
                    this.refs.toast.show(responseData.message)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    takePicture = () => {
        this.camera.capture()
            .then((data) => {
                PicturePath = data.path;
            })
            .catch(err => console.error(err));
    }
}

AppRegistry.registerComponent('Reni', () => Reni);
