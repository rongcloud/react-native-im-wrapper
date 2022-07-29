import React from "react"
import { NativeModules, ScrollView, Text, TouchableOpacity, View } from "react-native"
const { ExampleIM } = NativeModules;
export function createAlertView(buttonCount: number, subView: Element, onConfirm?: (() => void), onCancel?: () => void) {
    return <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView style={{ flex: 1 }}>
            {
                subView
            }
        </ScrollView>
        <View style={{ height: 70, backgroundColor: '#eeeeee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            {
                buttonCount > 1 &&
                <TouchableOpacity style={{
                    margin: 20,
                    flex: 1,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: "#dadada",
                    borderRadius: 5,
                    borderWidth: 1
                }} onPress={() => { if (onCancel) onCancel() }}>
                    <Text>取消</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity style={{
                margin: 20,
                flex: 1,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: "#dadada",
                borderRadius: 5,
                borderWidth: 1
            }} onPress={() => { if (onConfirm) onConfirm() }}>
                <Text>确定</Text>
            </TouchableOpacity>
        </View>
    </View >
}



export function isNull(obj: any) {
    return typeof obj == "undefined" || obj == null;
}

export function isEmpty(str: string) {
    return isNull(str) || str.length == 0 || str == '';
}


export function post(url: string, params: object, success: (obj: any) => void, error: (err: any) => void) {
    let json = JSON.stringify(params);
    let init = {
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=utf-8',
        },
        body: json
    };
    fetch(url, init)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            success(json);
        })
        .catch((exception) => {
            error(exception);
        });
}



export function jsonFormat(json: {}) {
    return JSON.stringify(json, null, 4)
}


export function showToast(message: string) {
    ExampleIM.showToast(message)
}
