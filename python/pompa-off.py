from gpiozero import LED
from signal import pause 

pompa = LED(17)
pompa.off()
print("pompa off")
pause()



# catatan .off() buat matikan, .toggle() buat toggle, .blink() buat kedip
