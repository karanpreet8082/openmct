
import socket
import time


UDP_IP = "127.0.0.1"
UDP_PORT = 50456
MESSAGE = "23,567,32,4356,456,132,4353467,0,0,0,0,0,0,0" 

data = 0 

keys = [
        "rollVal","pitchVal","yawVal","latVal","lngVal","heading","altVal","gpsstatusVal","airspeedVal","groundspeedVal","azVal","battery_voltageVal","battery_remainingVal", "armed"

]

data = 0
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # Internet, UDP
try:
    sock.sendto(MESSAGE.encode(), (UDP_IP, UDP_PORT))
except:
    print('Initial message failed!')

while True:

    for i in range(len(keys)):
       
        timeStamp = time.time()
        MESSAGE = "{},{},{}".format(keys[i],data+i,timeStamp)
        sock.sendto(MESSAGE.encode(), (UDP_IP, UDP_PORT))

        print(MESSAGE)
                
    if data < 100:
        data = data + 1
    else:
        data = 0
    print(data)

    time.sleep(0.1) 
