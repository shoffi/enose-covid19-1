import time
import ADS1256
import sys
import RPi.GPIO as GPIO
import smbus
 
# Get I2C bus
bus = smbus.SMBus(1) 
# SHT31 address, 0x44(68)
bus.write_i2c_block_data(0x44, 0x2C, [0x06]) # b669fbc0
#print(bus)
time.sleep(0.5)
# SHT31 address, 0x44(68)
# Read data back from 0x00(00), 6 bytes
# Temp MSB, Temp LSB, Temp CRC, Humididty MSB, Humidity LSB, Humidity CRC
data = bus.read_i2c_block_data(0x44, 0x00, 6)
# Convert the data
temp = data[0] * 256 + data[1]
#print(temp)
x = -45 + (175 * temp / 65535.0)
fTemp = -49 + (315 * temp / 65535.0)
y = 100 * (data[3] * 256 + data[4]) / 65535.0

cTemp  = float("{:.3f}".format(x))
humidity = float("{:.3f}".format(y))


ADC = ADS1256.ADS1256()
ADC.ADS1256_init()


def sensortgs():
    sendData = ""
    temp_sht = 0
    humi_sht = 0
    ADC_Value = ADC.ADS1256_GetAll()
    sendData += str(int(ADC_Value[0]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[1]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[2]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[3]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[4]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[5]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[6]*1023/0x7fffff))
    sendData += ";"
    sendData += str(int(ADC_Value[7]*1023/0x7fffff))
    sendData += ";"
    sendData += ""
    sendData += ";"
    sendData += str(cTemp) #10
    sendData += ";"
    sendData += str(humidity) #11
    sendData += ";"
    sendData += ""#12
    sendData += ";"
    sendData += ""#13
    sendData += ";"
    sendData += ""#14
    sendData += ";"
    sendData += ""#15
    sendData += ";"
    sendData += ""#16
    sendData += ";"
    sendData += ""#17
    sendData += ";"  
    sendData += ""#18
    sendData += ";"
    sendData += ""#19
    sendData += ";"
    sendData += ""#20
    sendData += ";"
    sendData += ""#21
    sendData += ";"
    sendData += ""#22
    sendData += ";"
    sendData += ""#23
    sendData += ";"
    sendData += ""#24
    sendData += ";"
    sendData += ""#25
    sendData += ";"
    sendData += ""#26
    sendData += ";"
    sendData += ""#27
    sendData += ";"
    sendData += ""#28
    sendData += ";"
    sendData += ""#29
    sendData += ";"
    sendData += ""#30
    sendData += ";"
    sendData += ""#31
    sendData += ";"
    sendData += ""#32
    sendData += ";"
    sendData += ""#33
    sendData += ";"
    sendData += ""#34
    sendData += ";"
    sendData += ""#35
    sendData += ";"
    sendData += ""#36
    sendData += ";"
    sendData += ""#37
    sendData += ";"
    sendData += ""#38
    sendData += ";"
    sendData += ""#39
    sendData += ";"
    sendData += ""#40
    sendData += ";"
    sendData += ""#41
    sendData += ";"
    sendData += ""#42
    sendData += ";"
    sendData += ""#43
    sendData += ";"
    sendData += ""#44
    sendData += ";"
    sendData += ""#45
    sendData += ";"
    sendData += ""#46
    sendData += ";"
    sendData += ""#47
    sendData += ";"
    sendData += ""#48
    sendData += ";"
    sendData += ""#49
    sendData += ";"
    sendData += ""#50
    sendData += ";"
    sendData += ""#51
    sendData += ";"
    sendData += ""#52
    sendData += ";"
    sendData += ""#53
    sendData += ";"
    sendData += ""#54
    sendData += ";"
    sendData += ""#55
    sendData += ";"
    sendData += ""#56
    sendData += ";"
    sendData += ""#57
    sendData += ";"
    sendData += ""#58
    sendData += ";"    
    sendData += ""#59
    sendData += ";"
    print(sendData)
    sys.stdout.flush()
    
    

while True:
    sensortgs()
    time.sleep(1)
