import time
#import Adafruit_GPIO.SPI as SPI
#import Adafruit_MCP3008
import math
import ADS1256
import sys
import smbus


#*************SHT***********
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






#*********Variabel MQ2*********
MQ2_LPG = 0
MQ2_CO  = 1
MQ2_SMOKE = 2
MQ2_ALCOHOL = 3
MQ2_CH4  = 4
MQ2_H2    =  5
MQ2_PROPANE =  6
MQ2_LPGCurve       =  [2.30103, 0.215259, -0.4672]
MQ2_COCurve        =  [2.30103, 0.726359, -0.3352]
MQ2_SmokeCurve    =  [2.30103, 0.55399, -0.4269]
MQ2_AlcoholCurve   =  [2.30103, 0.463247, -0.3719]
MQ2_CH4Curve     =  [2.30103, 0.503672, -0.3768]
MQ2_H2Curve       =  [2.30103, 0.321646, -0.4699]
MQ2_PropaneCurve   =  [2.30103, 0.230956, -0.4599]

#*********Variabel MQ3*********/
MQ3_ALCOHOL    =               7
MQ3_BENZINE    =               8
MQ3_CH4        =               9
MQ3_CO         =               10
MQ3_HEXANE     =               11
MQ3_LPG        =               12
MQ3_AlcoholCurve   =  [ -1, 0.3975, -0.6695]
MQ3_BenzineCurve  =  [ -1, 0.6204, -0.3711]
MQ3_CH4Curve      =  [ -1, 1.6956, -0.0477]
MQ3_COCurve       =  [ -1, 1.7558, -0.2556]
MQ3_HexaneCurve   =  [ -1, 1.722, -0.3564]
MQ3_LPGCurve     =  [-1, 1.7492, -0.306]

#*********Variabel MQ4*********/
MQ4_ALCOHOL =                  13
MQ4_CH4     =                  14
MQ4_CO      =                  15
MQ4_H2      =                  16
MQ4_LPG     =                  17
MQ4_SMOKE   =                  18
MQ4_AlcoholCurve  =  [2.30103, 0.610073, -0.0745]
MQ4_CH4Curve      =  [2.30103, 0.246576, -0.3532]
MQ4_COCurve        =  [2.30103, 0.625488, -0.0502]
MQ4_H2Curve       =  [2.30103, 0.576809, -0.1757]
MQ4_LPGCurve      =  [2.30103, 0.407259, -0.3217]
MQ4_SmokeCurve    =  [2.30103, 0.605137, -0.1095]

#*********Variabel MQ5*********/
MQ5_ALCOHOL     =              19
MQ5_CH4         =              20
MQ5_CO          =              21
MQ5_H2          =              22
MQ5_LPG         =              23
MQ5_AlcoholCurve   =  [2.30103, 0.553808, -0.2159]
MQ5_CH4Curve      =  [2.30103, -0.02029, -0.3873]
MQ5_COCurve       =  [2.30103, 0.564257, -0.139]
MQ5_H2Curve       =  [2.30103, 0.181233, -0.2394]
MQ5_LPGCurve      =  [2.30103, -0.16776, -0.3985]

#*********Variabel MQ6*********/
MQ6_ALCOHOL     =              24
MQ6_CH4         =              25
MQ6_CO          =              26
MQ6_H2          =              27
MQ6_LPG         =              28
MQ6_AlcoholCurve   =  [2.30103, 0.90091, -0.1654]
MQ6_CH4Curve    =  [2.30103, 0.415429, -0.3992]
MQ6_COCurve       = [2.30103, 0.947059, -0.0782]
MQ6_H2Curve       =  [2.30103, 0.727354, -0.2679]
MQ6_LPGCurve      =  [2.30103, 0.298047, -0.4204]

#*********Variabel MQ7*********/
MQ7_ALCOHOL =                  29
MQ7_CH4     =                  30
MQ7_CO      =                  31
MQ7_H2      =                  32
MQ7_LPG     =                  33
MQ7_AlcoholCurve   =  [1.69897, 1.192677, -0.0647]
MQ7_CH4Curve     =  [1.69897, 1.139636, -0.0928]
MQ7_COCurve      =  [1.69897, 0.192539, -0.6592]
MQ7_H2Curve      =  [1.69897, 0.104513, -0.7312]
MQ7_LPGCurve      =  [1.69897, 0.944213, -0.1296]

#*********Variabel MQ8*********/
MQ8_ALCOHOL  =                 34
MQ8_CH4      =                 35
MQ8_CO       =                 36
MQ8_H2       =                 37
MQ8_LPG      =                 38
MQ8_AlcoholCurve   =  [2.30103, 1.411723, -0.5889]
MQ8_CH4Curve    =  [2.30103, 1.736929, -0.1464]
MQ8_COCurve      =  [2.30103, 1.832831, -0.1248]
MQ8_H2Curve        =  [2.30103, 0.991883, -1.4441]
MQ8_LPGCurve       =  [2.30103, 1.477674, -0.2489]

#*********Variabel MQ9*********/
MQ9_CH4       =                39
MQ9_CO        =                40
MQ9_LPG       =                41
MQ9_CH4Curve         =  [2.30103, 0.508749, -0.3792]
MQ9_COCurve         =  [2.30103, 0.206901, -0.4458]
MQ9_LPGCurve         =  [2.30103, 0.325115, -0.471]

#*********Variabel MQ135*********/
# MQ135_ACETON      =            42
# MQ135_ALCOHOL     =            43
# MQ135_CO          =            44
# MQ135_CO2         =            45
# MQ135_NH4         =            46
# MQ135_TOLUOL      =            47
# MQ135_AcetonCurve    =  [1, 0.1586, -0.295]
# MQ135_AlcoholCurve   =  [1, 0.278, -0.3156]
# MQ135_COCurve       =  [1, 0.4508, -0.2538]
# MQ135_CO2Curve      =  [1, 0.3641, -0.3498]  
# MQ135_NH4Curve      =  [1, 0.4064, -0.4022]
# MQ135_ToluolCurve    =  [1, 0.1903, -0.2918]

# ///*********Variabel MQ138*********/
# //#define         MQ136_ALCOHOL                 (48)
# //#define         MQ136_BENZINE                 (49)
# //#define         MQ136_CH4                     (50)
# //#define         MQ136_CO                      (51)
# //#define         MQ136_N_HEXANE                (52)
# //#define         MQ136_PROPANE                 (53)//id sensor gas
# //float           MQ136_AlcoholCurve[3]   =  {2.30103, 0.462908, -0.3707};
# //float           MQ136_BenzineCurve[3]   =  {2.30103, 0.323015, -0.471};
# //float           MQ136_CH4Curve[3]       =  {2.30103, 0.506501, -0.3777};
# //float           MQ136_COCurve[3]        =  {2.30103, 0.729893, -0.3372};
# //float           MQ136_NHexaneCurve[3]   =  {2.30103, 0.2156, -0.4664};
# //float           MQ136_PropaneCurve[3]   =  {2.30103, 0.232893, -0.4631};

#*********Variabel GLOBAL*********/
VC_BOARD                    =    4.89  #//volt untuk sensor diukur dengan multitester
CALIBRATION_SAMPLE_TIMES    =  2   #//jumlah kalibrasi, lebih lama lebih bagus misal 2 menit (240)
CALIBRATION_SAMPLE_INTERVAL =  0.005 #//delay setiap jumlah kalibrasi (30*500ms=15000ms=15s)
READ_SAMPLE_INTERVAL        =  0.05 #//delay untuk merekam raw data analog
READ_SAMPLE_TIMES           =  5    #//jumlah raw data yang direkam setiap kali kirim
NUM_SENSOR                  =  8
#array nama mq sensor
MQ_NAME    =  ["MQ-2", "MQ-3", "MQ-4", "MQ-5", "MQ-6", "MQ-7", "MQ-8", "MQ-9"]
#array pin mq sensor
MQ_PIN      =  [0, 1, 2, 3, 4, 5, 6, 7]
#//load resistance (RL)
MQ_RL_VALUE =  [5, 200, 20, 20, 20, 10, 10, 10]
#//faktor Ro pada udara bersih (RO_CLEAN)
MQ_RO_CLEAN  =  [9.5818, 59.955, 4.4481, 6.4674, 9.8716, 26.008, 69.13, 9.7713]
#//array nilai Ro dari proses kalibrasi sensor (preheating)
MQ_RO     =  [0, 0, 0, 0, 0, 0, 0, 0]
#//array nilai Rs dari pembacaan tiap sensor
MQ_RS       =  [0, 0, 0, 0, 0, 0, 0, 0]
#//array nilai Rs_Ro dari pembacaan tiap sensor
MQ_RS_RO    =  [0, 0, 0, 0, 0, 0, 0, 0]
MQ_RS_RO1    =  [0, 0, 0, 0, 0, 0, 0, 0]
resistant = [0,0,0,0,0,0,0,0]
voltage = [0,0,0,0,0,0,0,0]

counter = 1
lastSend = 0
interval = 1

  
ADC = ADS1256.ADS1256()
ADC.ADS1256_init()  
    
def MQGetSensorVoltage(mq_pin):
  global vrl
  ADC_Value = ADC.ADS1256_GetAll()
  adc = int(ADC_Value[mq_pin]*1023/0x7fffff)
  vrl = (adc * VC_BOARD) / 1023.0;
  voltage[mq_pin] = adc
  return vrl;
  
def MQResistanceCalculation(rl_value, vrl): 
  rs  = rl_value * (VC_BOARD - vrl) / vrl;
  return rs;


def MQCalibration():
  for i in range (1, CALIBRATION_SAMPLE_TIMES):
    for j in range (0, NUM_SENSOR):
      vrl = MQGetSensorVoltage(MQ_PIN[j]);
      val = MQResistanceCalculation(MQ_RL_VALUE[j], vrl);
      MQ_RO[j] += val;

    time.sleep(CALIBRATION_SAMPLE_INTERVAL)

  for j in range (0, NUM_SENSOR):
    MQ_RO[j] = MQ_RO[j] / CALIBRATION_SAMPLE_TIMES;
    MQ_RO[j] = MQ_RO[j] / MQ_RO_CLEAN[j];

def MQGetSampleRs():
  for i in range (0, READ_SAMPLE_TIMES):
    for j in range (0, NUM_SENSOR):
      vrl = MQGetSensorVoltage(MQ_PIN[j]);
      rs = MQResistanceCalculation(MQ_RL_VALUE[j], vrl);
      x = rs
      resistant[j] = float("{:.3f}".format(x))
      MQ_RS[j] += rs;

    #time.sleep(READ_SAMPLE_INTERVAL);
    #time.sleep(0.000005)
  
  for j in range (0,NUM_SENSOR):
    MQ_RS[j] = MQ_RS[j] / READ_SAMPLE_TIMES; #//untuk menghitung rata-rata nilai pembacaan sampel yang 5 kali

def MQGetPercentage(rs_ro_ratio, pcurve):
  power = ((math.log10(rs_ro_ratio) - pcurve[1]) / pcurve[2]) + pcurve[0]; #//rumus dari paper
  x = pow(10, power)
  ppm =   float("{:.3f}".format(x))
  return ppm;

def MQGetGasPercentage(rs_ro_ratio, gas_id):
  if gas_id == MQ2_LPG:
    return MQGetPercentage(rs_ro_ratio, MQ2_LPGCurve);
  elif (gas_id == MQ2_CO):
    return MQGetPercentage(rs_ro_ratio, MQ2_COCurve);
  elif (gas_id == MQ2_SMOKE):
    return MQGetPercentage(rs_ro_ratio, MQ2_SmokeCurve);
  elif (gas_id == MQ2_ALCOHOL):
    return MQGetPercentage(rs_ro_ratio, MQ2_AlcoholCurve);
  elif (gas_id == MQ2_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ2_CH4Curve);
  elif (gas_id == MQ2_H2):
    return MQGetPercentage(rs_ro_ratio, MQ2_H2Curve);
  elif (gas_id == MQ2_PROPANE):
    return MQGetPercentage(rs_ro_ratio, MQ2_PropaneCurve);
  elif (gas_id == MQ3_ALCOHOL):
    return MQGetPercentage(rs_ro_ratio, MQ3_AlcoholCurve);
  elif (gas_id == MQ3_BENZINE):
    return MQGetPercentage(rs_ro_ratio, MQ3_BenzineCurve);
  elif (gas_id == MQ3_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ3_CH4Curve);
  elif (gas_id == MQ3_CO):
    return MQGetPercentage(rs_ro_ratio, MQ3_COCurve);
  elif (gas_id == MQ3_HEXANE):
    return MQGetPercentage(rs_ro_ratio, MQ3_HexaneCurve);
  elif (gas_id == MQ3_LPG):
    return MQGetPercentage(rs_ro_ratio, MQ3_LPGCurve);
  elif (gas_id == MQ4_ALCOHOL):
    return MQGetPercentage(rs_ro_ratio, MQ4_AlcoholCurve);
  elif (gas_id == MQ4_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ4_CH4Curve);
  elif (gas_id == MQ4_CO):
    return MQGetPercentage(rs_ro_ratio, MQ4_COCurve);
  elif (gas_id == MQ4_H2):
    return MQGetPercentage(rs_ro_ratio, MQ4_H2Curve);
  elif (gas_id == MQ4_LPG):
    return MQGetPercentage(rs_ro_ratio, MQ4_LPGCurve);
  elif (gas_id == MQ4_SMOKE):
    return MQGetPercentage(rs_ro_ratio, MQ4_SmokeCurve);
  elif (gas_id == MQ5_ALCOHOL):
    return MQGetPercentage(rs_ro_ratio, MQ5_AlcoholCurve);
  elif (gas_id == MQ5_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ5_CH4Curve);
  elif (gas_id == MQ5_CO):
    return MQGetPercentage(rs_ro_ratio, MQ5_COCurve);
  elif (gas_id == MQ5_H2):
    return MQGetPercentage(rs_ro_ratio, MQ5_H2Curve);
  elif (gas_id == MQ5_LPG):
    return MQGetPercentage(rs_ro_ratio, MQ5_LPGCurve);
  elif (gas_id == MQ6_ALCOHOL):
    return MQGetPercentage(rs_ro_ratio, MQ6_AlcoholCurve);
  elif (gas_id == MQ6_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ6_CH4Curve);
  elif (gas_id == MQ6_CO):
    return MQGetPercentage(rs_ro_ratio, MQ6_COCurve);
  elif (gas_id == MQ6_H2):
    return MQGetPercentage(rs_ro_ratio, MQ6_H2Curve);
  elif (gas_id == MQ6_LPG):
    return MQGetPercentage(rs_ro_ratio, MQ6_LPGCurve);
  elif (gas_id == MQ7_ALCOHOL):
    return MQGetPercentage(rs_ro_ratio, MQ7_AlcoholCurve);
  elif (gas_id == MQ7_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ7_CH4Curve);
  elif (gas_id == MQ7_CO):
    return MQGetPercentage(rs_ro_ratio, MQ7_COCurve);
  elif (gas_id == MQ7_H2):
    return MQGetPercentage(rs_ro_ratio, MQ7_H2Curve);
  elif (gas_id == MQ7_LPG):
    return MQGetPercentage(rs_ro_ratio, MQ7_LPGCurve);
  elif (gas_id == MQ8_ALCOHOL):
    return MQGetPercentage(rs_ro_ratio, MQ8_AlcoholCurve);
  elif (gas_id == MQ8_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ8_CH4Curve);
  elif (gas_id == MQ8_CO):
    return MQGetPercentage(rs_ro_ratio, MQ8_COCurve);
  elif (gas_id == MQ8_H2):
    return MQGetPercentage(rs_ro_ratio, MQ8_H2Curve);
  elif (gas_id == MQ8_LPG):
    return MQGetPercentage(rs_ro_ratio, MQ8_LPGCurve);
  elif (gas_id == MQ9_CH4):
    return MQGetPercentage(rs_ro_ratio, MQ9_CH4Curve);
  elif (gas_id == MQ9_CO):
    return MQGetPercentage(rs_ro_ratio, MQ9_COCurve);
  elif (gas_id == MQ9_LPG):
    return MQGetPercentage(rs_ro_ratio, MQ9_LPGCurve);
  else:
    return -1
  

def readAndSendSensorData():
  #MQGetPercentage()
  #MQGetGasPercentage()
  global vrl
  temp_dht = 0 
  humi_dht = 0
  MQGetSampleRs() #//250ms
  sendData = ""
  
  # for j in range (0, NUM_SENSOR):
    # MQ_RS_RO1[j] = MQ_RS[j] / MQ_RO[j];
  
  for j in range (0, NUM_SENSOR):
    MQ_RS_RO[j] = MQ_RS[j] / MQ_RO[j];
    if (MQ_NAME[j] == "MQ-2"):
      # sendData += str(MQ_RS_RO1[0]) #1
      # sendData += ";"
      # sendData += str(MQ_RS_RO1[1]) #2
      # sendData += ";"
      # sendData += str(MQ_RS_RO1[2]) #3
      # sendData += ";"
      # sendData += str(MQ_RS_RO1[3]) #4
      # sendData += ";"
      # sendData += str(MQ_RS_RO1[4]) #5
      # sendData += ";"
      # sendData += str(MQ_RS_RO1[5]) #6
      # sendData += ";"
      # sendData += str(MQ_RS_RO1[6]) #7
      # sendData += ";"
      # sendData += str(MQ_RS_RO1[7]) #8
      # sendData += ";"
      sendData += str(voltage[0]) #1
      sendData += ";"
      sendData += str(voltage[1]) #2
      sendData += ";"
      sendData += str(voltage[2]) #3
      sendData += ";"
      sendData += str(voltage[3]) #4
      sendData += ";"
      sendData += str(voltage[4]) #5
      sendData += ";"
      sendData += str(voltage[5]) #6
      sendData += ";"
      sendData += str(voltage[6]) #7
      sendData += ";"
      sendData += str(voltage[7]) #8
      sendData += ";"
      sendData += str("0") #9
      sendData += ";"
      sendData += str(cTemp) #10
      sendData += ";"
      sendData += str(humidity) #11
      sendData += ";"  
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ2_LPG)) #12
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ2_CO)) # 13
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ2_SMOKE)) #14
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ2_ALCOHOL)) #15
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ2_CH4)) #16
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ2_H2)) #17
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ2_PROPANE)) #18
      sendData += ";";
    elif (MQ_NAME[j] == "MQ-3"):
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ3_ALCOHOL)) #19
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ3_BENZINE)) #20
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ3_CH4)) #21
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ3_CO)) #22
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ3_HEXANE)) #23
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ3_LPG)) #24
      sendData += ";";
    elif (MQ_NAME[j] == "MQ-4"):
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ4_ALCOHOL)) #25
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ4_CH4)) #26
      sendData += ";"; 
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ4_CO)) #27
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ4_H2)) #28
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ4_LPG)) #29
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ4_SMOKE)) #30
      sendData += ";";
    elif (MQ_NAME[j] == "MQ-5"):
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ5_ALCOHOL)) #31
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ5_CH4)) #32
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ5_CO)) #33
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ5_H2)) #34
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ5_LPG)) #35
      sendData += ";";
    elif (MQ_NAME[j] == "MQ-6"):
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ6_ALCOHOL)) #36
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ6_CH4)) #37
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ6_CO)) #38
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ6_H2)) #39
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ6_LPG)) #40
      sendData += ";";
    elif (MQ_NAME[j] == "MQ-7"):
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ7_ALCOHOL)) #41
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ7_CH4)) #42
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ7_CO)) #43
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ7_H2)) #44
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ7_LPG)) #45
      sendData += ";";
    elif (MQ_NAME[j] == "MQ-8"):
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ8_ALCOHOL))#46
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ8_CH4)) #47
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ8_CO)) #48
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ8_H2)) #49
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ8_LPG)) #50
      sendData += ";";
    elif (MQ_NAME[j] == "MQ-9"):
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ9_CH4)) #51
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ9_CO)) #52
      sendData += ";";
      sendData += str(MQGetGasPercentage(MQ_RS_RO[j], MQ9_LPG)) #53
      sendData += ";";
      #Data untuk MQ-135  
      sendData += str("0") #54
      sendData += ";"
      sendData += str("0") #55
      sendData += ";"
      sendData += str("0") #56
      sendData += ";"
      sendData += str("0") #57
      sendData += ";"
      sendData += str("0") #58
      sendData += ";"
      sendData += str("0") #59
      sendData += ";"
  print(sendData)
  sys.stdout.flush()
  #time.sleep(1) 
   

def main():

  MQCalibration()
  while True:
    readAndSendSensorData()
    #time.sleep(0.1)
    
    
if __name__ == "__main__":
  main()
