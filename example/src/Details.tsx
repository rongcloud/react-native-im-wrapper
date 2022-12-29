import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { DeviceEventEmitter, FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from 'react-native';
import { History } from './Main';


export default class Details extends React.Component<NativeStackScreenProps<any>, { history: History[], unwindStates: boolean[] }> {
    _extraUniqueKey = (item: any, index: number) => {
        return item + index
    }

    constructor(props: any) {
        super(props)

        let history = [... this.props.route.params!.history]
        history.reverse()
        this.state = {
            history: history,
            unwindStates: history.map((value) => false),
        }
    }
    componentDidMount() {
        this.props.navigation.setOptions({ contentStyle: { backgroundColor: 'white' } })
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }}>调用列表</Text>
                    <TouchableOpacity
                        style={{
                            borderColor: "#dadada", borderRadius: 5,
                            borderWidth: 1, paddingHorizontal: 15, paddingVertical: 5
                        }}

                        onPress={() => {
                            let history = this.state.history
                            history.length = 0
                            this.setState({ history: history })
                            DeviceEventEmitter.emit('onHistoryChange')
                        }}
                    >
                        <Text style={{ fontSize: 15 }}>清除</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.history}
                    keyExtractor={this._extraUniqueKey}
                    ItemSeparatorComponent={() => {
                        return (<View style={{ height: 1, backgroundColor: '#e3e3e3' }} />)
                    }}

                    renderItem={(itemInfo: ListRenderItemInfo<History>) => {
                        let item = itemInfo.item
                        let showState = this.state.unwindStates
                        const index = itemInfo.index
                        let showText = item.data?.length > 5000 ? item.data?.slice(0, 5000) : item.data;
                        return (
                            <View>
                                <TouchableOpacity style={{ flexDirection: 'row', padding: 5 }}
                                    onPress={() => {
                                        showState[index] = !showState[index]
                                        this.setState({ unwindStates: showState })
                                    }}>
                                    <Text style={{ fontSize: 18, color: item.status != 0 ? 'red' : 'black' }}>{this.state.history.length - index - 1}.{item.operation}</Text>
                                </TouchableOpacity>
                                {
                                    showState[index] &&
                                    <View style={{ flexDirection: "row", flexWrap: 'wrap', backgroundColor: "#eeeeee", paddingVertical: 10, paddingHorizontal: 5 }}>
                                        <Text selectable={true} style={{ fontSize: 15 }}>{showText}</Text>
                                    </View>
                                }
                            </View>)
                    }}
                />
            </View>
        )
    }
}