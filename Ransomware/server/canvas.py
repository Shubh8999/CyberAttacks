import os
import time
import colorama
from colorama import Fore, Back, Style
colorama.init(autoreset=True)
from datetime import datetime

class xprinter():
    additional_information = {
            "Awaken watchdogs": [],
            "Script information": [],
            "Scuffed files": [],
            "SMA files": [],
            "DMA files": [],
            "Analysed files": [],
            "Errors": [],
            "Others": []
        }
    working = 0

    def __init__(self, folder_destination, folder_document, user, date_run): #, additional_information):
        self.folder_destination = folder_destination
        self.folder_document = folder_document
        self.user = user
        self.date_run = date_run
        self.execdate = []
        self.execdate.append(date_run[3])
        self.execdate.append(date_run[4])
        self.execdate.append(date_run[5])

    def xprint(self, mode=None):
        time.sleep(0.1)

    def xprinting(self, mode):
        if not self.working:
            mode = 'jump'
            self.working = 1
            self.xprint(mode)


            self.working = 0
        else:
            time.sleep(0.1)
            self.xprinting(mode)
    def add_script_info(self, info):
        self.additional_information["Script information"].append(info)
    def del_script_info(self, info=None):
        if info is not None:
            self.additional_information["Script information"].remove(info)
        else:
            del self.additional_information["Script information"][:]
            del self.additional_information["Others"][:]
            del self.additional_information["Errors"][:]


    def get_additional_info(self):
        return {
            'folder_destination': self.folder_destination,
            'folder_document': self.folder_document,
            'user': self.user,
            'date_run': datetime(*self.date_run[:6]),
            'execdate': self.execdate,
            'additional_information': self.additional_information
        }





def xprinttest():
    if os.path.isfile(os.getcwd() + r'\configs\xprintcounter.txt'):
        with open(os.getcwd() + r'\configs\xprintcounter.txt', 'r+') as xprintcount:
            if int(xprintcount.readline(1)) >= 5:
                time.sleep(0.3)
            else:
                xprintcount.write(str(int(xprintcount.readline(1)) + 1))
    else:
        f = open(os.getcwd() + r'\configs\xprintcounter.txt', 'x')
        with open(os.getcwd() + r'\configs\xprintcounter.txt', 'r+') as xprintcount:
            xprintcount.write("1")






"""def display_ending():
    display_swapping(2, 2.0)
    display_canvas(4)"""


if __name__ == '__main__':
    for i in range(10):
        #xprint()
        print(i)
        time.sleep(3)