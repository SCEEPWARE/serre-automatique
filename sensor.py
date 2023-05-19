# sensor.py

import random, time

while True:
    time.sleep(5)
    temperature = (random.random() * 20) - 5  # -5 to 15
    print(temperature, flush=True, end='')