#!/usr/bin/env python3
import subprocess
import logging
import os

try:
    subprocess.call(['git pull origin master'], shell=True)
    subprocess.call(['sudo /etc/init.d/apache2 restart'], shell=True)
except Exception as e:
    logging.error(e)
