//
//  LoginViewController.swift
//  TrembleWristband
//
//  Created by minami on 11/13/15.
//  Copyright © 2015 AutumnCOJT. All rights reserved.
//

import UIKit
import TwitterKit

class LoginViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let logInButton = TWTRLogInButton { (session, error) in
            if let unwrappedSession = session {
                let alert = UIAlertController(title: "Logged In",
                                            message: "User \(unwrappedSession.userName) has logged in",
                                    preferredStyle: UIAlertControllerStyle.Alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.Default, handler: nil))
                self.presentViewController(alert, animated: true, completion: nil)
            } else {
                NSLog("Login error: %@", error!.localizedDescription);
            }
        }

        // TODO: Change where the log in button is positioned in your view
        logInButton.center = self.view.center
        self.view.addSubview(logInButton)


        // Do any additional setup after loading the view.
    }

    
}
