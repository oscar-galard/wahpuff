# Project Wahpuff
### Folder structure
pp/
├── Models/
│   ├── User.php
│   ├── Course.php
│   ├── CourseVideo.php
│   ├── Plan.php
│   ├── Subscription.php
│   ├── Payment.php
│   ├── Appointment.php
│   ├── Message.php
│   └── DiscountCode.php

├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── LoginController.php
│   │   │   └── RegisterController.php
│   │   ├── CourseController.php
│   │   ├── SubscriptionController.php
│   │   ├── PaymentController.php
│   │   ├── AppointmentController.php
│   │   └── MessageController.php
│   │
│   └── Requests/
│       ├── StoreSubscriptionRequest.php
│       ├── StoreAppointmentRequest.php
│       ├── StoreMessageRequest.php
│       └── ApplyDiscountCodeRequest.php

├── Services/
│   └── Payments/
│       ├── PaymentServiceInterface.php
│       ├── PaypalService.php
│       └── StripeService.php

├── Actions/
│   └── Courses/
│       └── FetchCoursesAction.php

└── Policies/
    ├── CoursePolicy.php
    └── AppointmentPolicy.php

### URL links for images.
optimizing the images with imagemagick, pngquant, also resizing for each purpose.
for hosting the images and get the url for the db, we will use https://www.imghippo.com/ 

```bash
#!/bin/bash

input_dir=~/Pictures/webwaImgs
output_dir=~/projects/output_images

mkdir -p "$output_dir"

while IFS= read -r filename; do
    input_path="$input_dir/$filename"
    output_path="$output_dir/$filename"
    magick "$input_path" -strip -quality 90% PNG8:- | pngquant --speed 1 --quality 65-80 -o "$output_path" -
done < file_list.txt
```
https://www.imghippo.com/i/Jtro3221gGI.png

https://www.imghippo.com/i/PAKF1630ljc.png
