const options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
}

export default async () => await new Promise( (resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject, options) )

    