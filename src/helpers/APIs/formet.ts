export 
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be displayed as 12
    const formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    return formattedTime;
}

// Function to get user's location (latitude and longitude)
export 
                const longitude = position.coords.longitude;
                resolve({ latitude, longitude });
            });
        } else {
            reject("Geolocation is not available in this browser.");
        }
    });
}