/*global daum*/
import React from 'react';

const mapStyle = {
    width: '80%',
    height: '60%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
}

class ItemMaps extends React.Component {
    componentDidMount () {
        // const scriptKakaoJS = document.createElement("script");
        // scriptKakaoJS.type = "text/javascript";
        // scriptKakaoJS.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey="";
        // document.head.appendChild(scriptKakaoJS);
        
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };  
        const map = new daum.maps.Map(mapContainer, mapOption);      // 지도를 생성합니다    
        const geocoder = new daum.maps.services.Geocoder();          // 주소-좌표 변환 객체를 생성합니다
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(this.props.match.params.addr, function(result, status) { 
            // 정상적으로 검색이 완료됐으면 
            if (status === daum.maps.services.Status.OK) {
                const coords = new daum.maps.LatLng(result[0].y, result[0].x);
                const marker = new daum.maps.Marker({                // 결과값으로 받은 위치를 마커로 표시합니다
                    map: map,
                    position: coords
                });
        
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new daum.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">추억의 장소</div>'
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } else {
                console.log("맞는 위치가 없습니다.");
                this.props.history.push("/BoardList");
            }
        });  
    }
    render() {
        return (
            <div id="map" style={mapStyle}></div>
        )
    }
}

export default ItemMaps;