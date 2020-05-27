<template>
    <div class="BMap">
        <router-link target="_self" class="link" to="Amap">百度地图版</router-link>
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
        <div id="mapPanel">
            <div style="text-align:center;padding-top:200px;color:#fff;">地图加载中...</div>
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
                <img src="./img/pointer.png" alt />
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
                    <img src="img/empty.jpg" alt />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {loadingMap} from './utils/load'
export default {
    name: 'mapComponent',
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
            local: null
        }
    },
    created() {
        this.loadScript()
    },
    methods: {
        submitAdd() {
            // console.log(this.curTit + this.curAddress)
            // console.log(this.r_lng + ',' + this.r_lat)
            let address = {
                curTit: this.curTit,
                curAddress: this.curAddress,
                r_lng: this.r_lng,
                r_lat: this.r_lat
            }
            console.log(address, '000')
            // this.$emit('func', address)
            this.$router.replace({path: '/subOrder', query: {address: JSON.stringify(address)}})
        },
        loadScript() {
            loadingMap('baidu', 'PHP7EQW84t75TQpliGLsiz8aZlQZushy').then(() => {
                this.initMap()
            })
            // let script = document.createElement("script");
            // script.src = "";
            // document.body.appendChild(script);
            // script.onload=()=>{
            //   alert("fcku")
            //   this.initMap();
            // }
            // setTimeout(()=>{
            //   this.initMap()
            // },3000)
        },
        openPoi() {
            this.poiShow = true
        },
        hidePoi() {
            this.poiShow = false
        },
        //init Map
        initMap() {
            // this.map = new AMap.Map('m-map', {
            //   center: [116.397428, 39.90923],
            //   resizeEnable: true,
            //   zoom: 4
            // });
            this.map = new window.BMap.Map('mapPanel')
            //初始城市上海
            let nowr_lat = 0
            let nowr_lng = 0
            if (this.$store.state.nowAddress.r_lat && this.$store.state.nowAddress.r_lng) {
                nowr_lat = this.$store.state.nowAddress.r_lat
                nowr_lng = this.$store.state.nowAddress.r_lng
            } else {
                nowr_lat = 121.480539
                nowr_lng = 31.235929
            }
            this.map.centerAndZoom(new BMap.Point(nowr_lat, nowr_lng), 18)
            this.map.addEventListener('dragend', () => {
                // $(".pos-icon .obj").animate({
                //   "top": "0px"
                // });
                // setTimeout(function() {
                //   _obj.jumping = false;
                // }, 500);
                this.showPoi()
                // Mthd.$("#address-detail").blur();
            })
            this.geoLocation = new window.BMap.Geolocation()
            this.getPos()
            this.mapShow = true
        },
        getPos() {
            let geoL = this.geoLocation
            geoL.getCurrentPosition(r => {
                if (geoL.getStatus() == BMAP_STATUS_SUCCESS) {
                    this.cur_city = r.address.city
                    this.resetAutocomplete(this.cur_city)
                    var c_lat = r.point.lat
                    var c_lng = r.point.lng
                    // var myIcon = new BMap.Icon("/webapp/release/h5App/address/edit/imgs/huaji.jpg", new BMap.Size(16, 16));
                    // var lmarker = new BMap.Marker(new BMap.Point(c_lng, c_lat), {
                    //   icon: myIcon
                    // });
                    this.curcity = this.cur_city.split('市')[0]
                    // _obj.map.addOverlay(lmarker);
                    this.map.centerAndZoom(new BMap.Point(c_lng, c_lat), 16)
                    this.showPoi()
                } else {
                }
            })
        },
        showPoi() {
            var center = this.map.getCenter()
            var sc_pt = new BMap.Point(center.lng, center.lat)
            // $(".m-filter").animate({
            //   left: "87%"
            // }, 500);
            var geoc = new BMap.Geocoder()
            var mOption = {
                poiRadius: 2000, //半径为1000米内的POI,默认100米
                numPois: 1 //列举出50个POI,默认10个
            }
            geoc.getLocation(
                sc_pt,
                rs => {
                    var results = rs.surroundingPois
                    var Rlist = []
                    if (results.length > 0) {
                        for (var i = 0; i < results.length; ++i) {
                            Rlist.push({
                                title: results[i].title,
                                address: results[i].address,
                                city: results[i].city,
                                lng: results[i].point.lng,
                                lat: results[i].point.lat
                            })
                        }
                        this.showList(Rlist)
                    } else {
                        // $(".ListPanel").html("");
                        // $(".ListPanel").append("<div class='empty-result'>待领取人达成</div>");
                    }
                },
                mOption
            )
        },
        showList(list) {
            var reslt = ''
            for (var i in list) {
                reslt += list[i].address + list[i].title
            }
            this.r_lat = list[0].lat
            this.r_lng = list[0].lng
            this.curAddress = list[0].address
            this.curTit = list[0].title
        },
        resetAutocomplete(_cityStr) {
            if (this.ac) this.ac.dispose()
            this.ac = new BMap.Autocomplete({
                input: 'address-detail',
                location: _cityStr,
                onSearchComplete: this.SearchingCmplt
            })
        },
        getPoi(poi) {
            this.hidePoi()
            this.local = new BMap.LocalSearch(this.map, {
                //智能搜索
                onSearchComplete: this.searchDone
            })
            let _value = poi
            this.r_address = _value.address + _value.name
            this.local.search(this.r_address)
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
            for (var i = 0; i < AutocompleteResult.getNumPois(); i++) {
                if (AutocompleteResult.getPoi(i)) {
                    poiDetails.push({
                        name: AutocompleteResult.getPoi(i).business,
                        address: AutocompleteResult.getPoi(i).city + AutocompleteResult.getPoi(i).district,
                        city:
                            AutocompleteResult.getPoi(i).city.split('省').length > 1
                                ? AutocompleteResult.getPoi(i).business
                                : AutocompleteResult.getPoi(i).city,
                        district: AutocompleteResult.getPoi(i).district
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
