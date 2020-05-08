<template>
    <div class="AMap">
        <router-link target="_self" class="link" to="Bmap">高德地图版</router-link>
        <div class="city-panel"></div>
        <div class="m-filter">
            <div class="mui-input-row mui-search mui-active">
                <input
                    type="search"
                    id="address-detail"
                    class="address-detail mui-input-clear"
                    name="address-detail"
                    placeholder="选择收货地址 街道/小区"
                />
            </div>
            <span class="sl-switch">
                <span class="curcity">{{curcity}}</span>
                <span class="icon icon-ctrl pos"></span>
            </span>
            <!-- <span class="cancel">取消</span> -->
        </div>
        <div class="pos-icon" v-if="mapShow">
            <div class="obj">
                <img src="./img/cur.png" />
            </div>
        </div>
        <div id="mapPanelG">
            <div style="text-align:center;padding-top:200px;color:#fff">地图加载中...</div>
        </div>
        <div id="m-result">
            <span class="curResult">
                <img src="./img/local.png" alt />
                <span class="curTit">{{curTit}}</span>
                <span class="curAddress">{{curAddress}}</span>
            </span>
            <button class="confirm" @click="submitAdd">确定</button>
        </div>
        <span class="pos-panel">
            <div class="pos-tool" @click="getPos">
                <div class="overlay-loader">
                    <div class="loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </span>
        <div class="cityList" id="cityPanel"></div>
        <div class="poiList" id="poiPanel" v-if="poiShow">
            <div class="content">
                <ul>
                    <li v-for="poi in poiList.data" @click="getPoi(poi)">
                        <img src="./img/building.png" alt />
                        <span class="poi-name">{{poi.name}}</span>
                        <span class="poi-address">{{poi.address}}</span>
                    </li>
                </ul>
                <div class="empty" v-if="poiList.data.length==0">
                    <img src="./img/empty.jpg" alt />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {loadingMap} from './utils/load'
export default {
    name: 'HelloWorld',
    data() {
        return {
            poiList: {data: []},
            map: null,
            geoLocation: null,
            ac: null,
            cur_city: '',
            mapShow: false,
            r_address: '',
            cityName: '',
            r_city: '',
            r_name: '',
            r_lng: '',
            r_lat: '',
            poiShow: false,
            curTit: '',
            curAddress: '',
            curcity: '定位中',
            local: null,
            geocoder: null,
            resultAddress: null,
            cityCode: null
        }
    },
    created() {
        this.loadScript()
    },
    methods: {
        submitAdd() {
            console.log(this.curTit + this.curAddress)
            console.log(this.r_lng + ',' + this.r_lat)
        },
        loadScript() {
            loadingMap('gaod', 'd60f917b96c86e57f01c75a4d3b19e38').then(() => {
                this.initMap()
            })
        },
        openPoi() {
            this.poiShow = true
        },
        hidePoi() {
            this.poiShow = false
        },
        //init Map
        initMap() {
            this.map = new AMap.Map('mapPanelG', {
                center: [116.397428, 39.90923],
                resizeEnable: true,
                zoom: 18
            })
            this.map.on('dragend', () => {
                var center = this.map.getCenter()
                this.r_lng = center.lng
                this.r_lat = center.lat
                this.showPoi()
            })
            // //初始城市上海
            // this.map.addEventListener("dragend", () => {
            //   this.showPoi();
            // });
            // var opts = {
            //   subdistrict: 1, //返回下一级行政区
            //   showbiz: false //最后一级返回街道信息
            // };
            this.map.plugin('AMap.Geolocation', () => {
                this.geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: false,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 1000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB'
                })
                // AMap.plugin('AMap.CitySearch', ()=>{
                //   var citySearch = new AMap.CitySearch()
                //   citySearch.getLocalCity((status, result)=> {
                //     if (status === 'complete' && result.info === 'OK') {
                //       // 查询成功，result即为当前所在城市信息
                //       console.log(result)
                //       this.map.panTo([result.position.lng,result.position.lat]);
                //     }
                //     else{

                //     }
                //   })
                // })
                // AMap.event.addListener(geolocation, 'complete', onComplete)
                // AMap.event.addListener(geolocation, 'error', onError)
            })
            // this.geoLocation = new AMap.DistrictSearch(opts);
            // this.geoLocation = new window.BMap.Geolocation();
            this.getPos()
            this.mapShow = true
        },
        getPos() {
            this.geolocation.getCurrentPosition((status, result) => {
                if (result.status == 1 && result.info === 'SUCCESS') {
                    this.resultAddress = result.formattedAddress
                    this.r_lng = result.position.lng
                    this.r_lat = result.position.lat
                    this.map.panTo([result.position.lng, result.position.lat])
                    this.cur_city = result.addressComponent.city
                        ? result.addressComponent.city
                        : result.addressComponent.province
                    this.cityCode = result.addressComponent.citycode
                    this.curcity = this.cur_city.split('市')[0]
                } else {
                    this.map.panTo([121.39304, 31.16599])
                    this.cur_city = '上海市'
                    this.resultAddress = '上海市徐汇区漕河泾新兴技术开发区莲花路'
                    this.r_lng = 121.39304
                    this.r_lat = 31.16599
                    this.curcity = '上海'
                    this.cityCode = '021'
                }
                this.showPoi()
                this.resetAutocomplete(this.cur_city)
            })
            // geoL.getCurrentPosition((r) => {
            //   if (geoL.getStatus() == BMAP_STATUS_SUCCESS) {

            //     var c_lat = r.point.lat;
            //     var c_lng = r.point.lng;
            //     this.map.centerAndZoom(new BMap.Point(c_lng, c_lat), 16);
            //     this.showPoi();
            //   } else {}
            // });
        },
        showPoi() {
            var center = this.map.getCenter()
            // var sc_pt = new AMap.Point(center.lng, center.lat);
            // $(".m-filter").animate({
            //   left: "87%"
            // }, 500);
            AMap.plugin('AMap.Geocoder', () => {
                this.geocoder = new AMap.Geocoder({
                    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                    city: '全国',
                    extensions: 'all'
                })

                // 使用geocoder做地理/逆地理编码
            })
            this.geocoder.getAddress([this.r_lng, this.r_lat], (info, rs) => {
                var results = rs.regeocode
                var Rlist = []
                if (results.pois.length > 0) {
                    for (var i = 0; i < results.pois.length; ++i) {
                        Rlist.push({
                            title: results.pois[i].name,
                            address:
                                results.addressComponent.city +
                                results.addressComponent.district +
                                results.pois[i].address,
                            city: results.addressComponent.city
                                ? results.addressComponent.city
                                : results.addressComponent.province,
                            lng: results.pois[i].location.lng,
                            lat: results.pois[i].location.lat
                        })
                    }
                    // Rlist = {
                    //   "title": results.addressComponent.township,
                    //   "address": results.formattedAddress,
                    //   "city": results.addressComponent.city ? results.addressComponent.city : results.addressComponent.province,
                    //   "lng": this.r_lng,
                    //   "lat": this.r_lat
                    // };
                    this.showList(Rlist)
                } else {
                    // $(".ListPanel").html("");
                    // $(".ListPanel").append("<div class='empty-result'>待领取人达成</div>");
                }
            })
        },
        showList(list) {
            // var reslt = ""
            // for (var i in list) {
            //   reslt += (list[i].address + list[i].title);
            // }
            this.r_lat = list[0].lat
            this.r_lng = list[0].lng
            this.curAddress = list[0].address
            this.curTit = list[0].title
        },
        resetAutocomplete(_cityStr) {
            // if (this.ac) this.ac.dispose();
            // this.ac = new BMap.Autocomplete({
            //   "input": "address-detail",
            //   "location": _cityStr,
            //   "onSearchComplete": this.SearchingCmplt
            // });
            this.ac = new AMap.Autocomplete({
                input: 'address-detail',
                city: _cityStr
            })
            AMap.event.addListener(this.ac, 'complete', this.SearchingCmplt)
        },
        getPoi(poi) {
            this.hidePoi()
            // this.local = new BMap.LocalSearch(this.map, { //智能搜索
            //   onSearchComplete: this.searchDone
            // });
            this.local = new AMap.PlaceSearch({})
            let _value = poi
            this.r_address = _value.address + _value.name
            this.local.search(this.r_address, (status, result) => {
                var pp = result.poiList.pois[0].location
                this.map.panTo([pp.lng, pp.lat])
                this.curAddress = result.poiList.pois[0].address
                this.curTit = result.poiList.pois[0].name
                this.curcity = poi.city
                // $("#cur-city").text(this.cityName);
                this.resetAutocomplete(this.cityName)
            })
        },
        searchDone() {
            var pp = this.local.getResults().getPoi(0).point //获取第一个智能搜索的结果
            this.map.centerAndZoom(pp, 18)
            this.curAddress = this.local.getResults().getPoi(0).address
            this.curTit = this.local.getResults().getPoi(0).title
            if (this.cityName !== '') {
                this.curcity = this.cityName.split('市')[0]
                // $("#cur-city").text(this.cityName);
                this.resetAutocomplete(this.cityName)
            }
        },
        SearchingCmplt(AutocompleteResult) {
            var poiDetails = []
            for (var i = 0; i < AutocompleteResult.count; i++) {
                if (AutocompleteResult.tips[i].id || AutocompleteResult.tips[i].adcode) {
                    poiDetails.push({
                        name: AutocompleteResult.tips[i].name,
                        address: AutocompleteResult.tips[i].district + AutocompleteResult.tips[i].address,
                        city: AutocompleteResult.tips[i].id
                            ? AutocompleteResult.tips[i].district.split('市')[0]
                            : AutocompleteResult.tips[i].name,
                        district: AutocompleteResult.tips[i].district
                    })
                }
            }
            this.poiList = {
                data: []
            }
            this.poiList.data = poiDetails
            this.openPoi()
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import './index.less';
</style>
