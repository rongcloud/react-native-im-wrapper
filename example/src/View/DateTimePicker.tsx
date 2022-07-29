
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
export default class MyDateTimePicker extends React.Component<{}, {
    date: Date,
    show: boolean,
    mode: 'date' | 'time'
}>

{
    constructor(props: any) {
        super(props)

        this.state = {
            date: new Date(),
            show: false,
            mode: 'date'
        }
    }


    getTime() {
        return this.state.date.getTime()
    }

    getDate()
    {
        return this.state.date
    }

    render() {
        let y = String(this.state.date.getFullYear())
        let M = String(this.state.date.getMonth() + 1)
        let d = String(this.state.date.getDate())

        let h = String(this.state.date.getHours())
        let m = String(this.state.date.getMinutes())
        let s = String(this.state.date.getSeconds())
        M = M.padStart(2, '0')
        d = d.padStart(2, '0')
        h = h.padStart(2, '0')
        m = m.padStart(2, '0')
        s = s.padStart(2, '0')

        return (
            <View >
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() =>
                        this.setState({ show: true, mode: 'date' })}>
                        <Text style={{ fontSize: 18, textDecorationLine: 'underline', color: '#f15b6c' }}>{y}-{M}-{d}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }}
                        onPress={() => this.setState({ show: true, mode: 'time' })}>
                        <Text style={{ fontSize: 18, textDecorationLine: 'underline', color: '#f15b6c' }}>{h}:{m}:{s}</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.show &&
                    <DateTimePicker value={this.state.date}
                        mode={this.state.mode}
                        display={Platform.OS == 'ios' ? 'inline' : "default"}

                        onChange={
                            (event: DateTimePickerEvent, date?: Date) => this.setState({ show: false, date: date! })}

                    />
                }
            </View>)
    }
}