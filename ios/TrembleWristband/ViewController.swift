//
//  ViewController.swift
//  TrembleWristband
//
//  Created by minami on 11/4/15.
//  Copyright (c) 2015 AutumnCOJT. All rights reserved.
//

import UIKit
import CoreBluetooth

class ViewController: UIViewController, CBCentralManagerDelegate, CBPeripheralDelegate {
    
    var isScanning = false
    
    var centralManager: CBCentralManager!
    var peripheral: CBPeripheral!
    var servoControlPoint: CBCharacteristic!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.centralManager = CBCentralManager(delegate: self, queue: nil)
    }
    
    
    func centralManagerDidUpdateState(central: CBCentralManager) {
        print("state \(central.state)");
        
        switch (central.state) {
        case .PoweredOff:
            print("Bluetooth Powered Off")
        case .PoweredOn:
            print("Bluetooth Powered On")
        default:
            break
        }
    }
    
    func centralManager(central: CBCentralManager, didDiscoverPeripheral peripheral: CBPeripheral, advertisementData: [String : AnyObject],
        RSSI: NSNumber)
    {
        print("BLE_Device:\(peripheral)")
        
        if peripheral.name != nil && peripheral.name!.hasPrefix("EdisonKun") {
            self.peripheral = peripheral
            self.centralManager.connectPeripheral(self.peripheral, options: nil)
        }
    }
    
    func centralManager(central: CBCentralManager, didConnectPeripheral peripheral: CBPeripheral)
    {
        print("Connected")
        peripheral.delegate = self
        peripheral.discoverServices(nil)
    }
    
    func centralManager(central: CBCentralManager, didFailToConnectPeripheral peripheral: CBPeripheral, error: NSError?)
    {
        print("Connect error...")
    }
    
    func centralManager(central: CBCentralManager,
        didDisconnectPeripheral peripheral: CBPeripheral,
        error: NSError?)
    {
        print("Disconnect!")
        self.centralManager.cancelPeripheralConnection(self.peripheral)
        self.peripheral = nil
        self.servoControlPoint = nil
        self.view.backgroundColor = UIColor(red:0.00, green:0.44, blue:0.77, alpha:1)
    }
    
    func peripheral(peripheral: CBPeripheral, didDiscoverServices error: NSError?) {
        if error != nil {
            print("error: \(error)")
            return
        }
        let services: NSArray = peripheral.services!
        print("\(services) ServicesCount: \(services.count)")
        for obj in services {
            if let service = obj as? CBService {
                peripheral.discoverCharacteristics(nil, forService: service)
            }
        }
    }
    
    func peripheral(peripheral: CBPeripheral, didDiscoverCharacteristicsForService service: CBService,
        error: NSError?)
    {
        if error != nil {
            print("error: \(error)")
            return
        }
        print("EdisonkunP: \(service.UUID)");
        
        let characteristics: NSArray = service.characteristics!
        print("\(characteristics) CharacteristicsCount: \(characteristics.count)")
        for obj in characteristics {
            if let characteristic = obj as? CBCharacteristic {
                if characteristic.UUID.isEqual(CBUUID(string: "00003333-0000-1000-8000-00805F9B34FB")) {
                    self.servoControlPoint = characteristic
                    print("Found sensor")
                    self.view.backgroundColor = UIColor(red:0.12,green:0.60,blue:1.00,alpha:1.0)
                }
            }
        }
    }
    
    func peripheral(peripheral: CBPeripheral, didWriteValueForCharacteristic characteristic: CBCharacteristic, error: NSError?) {
        let data = characteristic.value!.description
        let dataContent = (data as NSString).substringWithRange(NSRange(location: 1, length: data.utf16.count-2))
        var result = ""
        for var i = 0; i < dataContent.utf16.count/2; i++ {
            result += ((dataContent as NSString).substringWithRange(NSRange(location: i*2+1, length: 1)))
        }
        print(result)
    }
    
    
    
    func peripheral(peripheral: CBPeripheral, didUpdateValueForCharacteristic characteristic: CBCharacteristic, error: NSError?) {
        print("update!:%@",peripheral);
    }

    func peripheral(peripheral: CBPeripheral, didUpdateNotificationStateForCharacteristic characteristic: CBCharacteristic, error: NSError?) {
        if error != nil {
            print("Notify状態更新失敗...error: \(error)", terminator: "")
        } else {
            print("Notify状態更新成功！ isNotifying: \(characteristic.isNotifying)", terminator: "")
        }
    }
    
   
    @IBAction func pushNotify(sender: AnyObject) {
        self.peripheral.setNotifyValue(true, forCharacteristic: self.servoControlPoint)
    }
 
    @IBAction func pushButton(sender: AnyObject) {
        if self.peripheral == nil {
            self.centralManager.scanForPeripheralsWithServices(nil, options: nil)
        } else {
            let str = "hello";
            self.peripheral.writeValue(
                str.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false)!,
                forCharacteristic: self.servoControlPoint,
                type: CBCharacteristicWriteType.WithResponse
            )
        }
    }
}

