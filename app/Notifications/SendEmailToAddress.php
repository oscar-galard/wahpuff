<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class SendEmailToAddress extends Notification
{
    protected $email;

    public function __construct($email)
    {
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('🎉 Nuevo Estudiante Registrado - Wahpuff')
            ->view('emails.new-user-notification', ['user' => $notifiable]);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function viaForMail()
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification when sent directly.
     */
    public function toMailDirect($user)
    {
        return (new MailMessage)
            ->subject('🎉 Nuevo Estudiante Registrado - Wahpuff')
            ->view('emails.new-user-notification', ['user' => $user]);
    }
}