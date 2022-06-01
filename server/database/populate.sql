INSERT INTO robotmodel (rm_robotmodelID, rm_specsID, rm_mtypeID, rm_name)
VALUES (1, 1, 1, 'i4-350L');

INSERT INTO modelspecs (ms_modelspecsID, ms_payload, ms_reach, ms_joint1_range,
                        ms_joint2_range, ms_joint3_range, ms_joint4_range,
                        ms_joint4_inertia, ms_cycle_time, ms_downward_push_force,
                        ms_joint1_speed, ms_joint2_speed, ms_joint3_speed, ms_joint4_speed)
VALUES (1, '2 kg rated - 5 kg maximum', '350 mm', '+/- 135°', '+/- 135°',
        '180 mm', '+/- 360°', '0.05 kg-m² maximum', '0.57 s', '150 N',
        '456 degrees/s', '456 degrees/s', '800 mm/s', '6000 degrees/s');

INSERT INTO maintenancetype (mt_maintenancetypeID, mt_name) VALUES (1, 'Scheduled Maintenance');

INSERT INTO maintenanceitem (mt_maintenanceitemID, mt_item, mt_period, mt_reference)
VALUES (1, 1, 'Check E-stop, enable and key switches, and barrier interlocks',
       '6 months', 'Refer to 6-2-2 Checking Safety Functions on page 6-3 for more information.'),
       (2, 1, 'Check fastener torques', '3 months', 'Refer to 6-2-3 Checking Fastener Torques on page 6-4 for more information.'),

       (3, 1, 'Check safety labels', '1 week', 'Refer to 6-2-4 Checking Safety and Warning Labels on page 6-4 for more information.'),
       (4, 1, 'Check the High Power indicator operation', '1 week', 'Refer to High Power Indicator Check Procedure on page 3-32 for more information.'),
       (5, 1, 'Check for signs of oil around robot joints', '3 months ', 'Refer to 6-2-5 Checking for Oil Leaks on page 6-5 for more information.'),
       (6, 1, 'Lubricate the joint 3 quill', '3 months or 150km of travel', 'Refer to 6-2-6 Lubricating Joint 3 on page 6-6 for more information.'),
       (7, 1, 'Replace the encoder backup batteries', '2 to 4 years', 'Refer to 6-2-7 Replacing Encoder Backup Batteries on page 6-7 for more information'),
       (8, 1, 'Clean the exterior of the robot', 'As needed', 'Refer to 6-2-8 Cleaning the Robot on page 6-8 for more information.');


