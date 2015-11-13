//
//  GameStartViewController.swift
//  TrembleWristband
//
//  Created by minami on 11/13/15.
//  Copyright © 2015 AutumnCOJT. All rights reserved.
//

import UIKit

class GameStartViewController: UIViewController {

    @IBOutlet weak var userNameLabel: UILabel!
    @IBOutlet weak var roomNameTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        let userDefault = NSUserDefaults.standardUserDefaults()
        let userName = userDefault.valueForKey("userName")
        userNameLabel.text = String(userName!)
    }

    @IBAction func didTapScreen(sender: AnyObject) {
        self.view.endEditing(true)
    }
    @IBAction func didPushedCreateRoomButton(sender: AnyObject) {
        let roomName = roomNameTextField.text
        print(roomName)
        performSegueWithIdentifier("toCreateRoomVC", sender: self)
    }
    

    @IBAction func didPushedJoinRoomButton(sender: AnyObject) {
        performSegueWithIdentifier("toJoinRoomVC", sender: self)
    }
}
