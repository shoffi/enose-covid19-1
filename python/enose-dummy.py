import sys
import time
from random import randint

n = 59

while 1:
	string = ""

	for i in range(n):
		string = string +str(randint(0,500)) + ";"
	
	print(string)
	sys.stdout.flush()
	time.sleep(1)
	# time.sleep(0.1)