# sensor.py

import random, time

while True:
    time.sleep(1)
    temperature = (random.random() * 20) - 5  # -5 to 15
    print(str(round(temperature, 1)), flush=True, end='')