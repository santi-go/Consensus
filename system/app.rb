require 'rubygems'
require 'sinatra/base'
require 'mail'
require 'sinatra/cross_origin'

class App < Sinatra::Base

    set :bind, '0.0.0.0'
    configure do
      enable :cross_origin
    end
    before do
      response.headers['Access-Control-Allow-Origin'] = '*'
    end

    options "*" do
      response.headers["Allow"] = "GET, POST, OPTIONS"
      response.headers["Access-Control-Allow-Headers"] = "*"
      response.headers["Access-Control-Allow-Origin"] = "*"
    end

  post '/' do
    'Consensus'
  end

  get '/SendPropose' do
  end


  Mail.defaults do
    delivery_method :smtp, {
      address: 'smtp.sendgrid.net',
      port: 25,
      user_name: 'apikey',
      password: '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'
    }
  end


  get '/send-mail' do
    mail = Mail.new do
      from    'hola@devscola.org'
      to      'elenamg31@gmail.com'
      subject 'This is a test email'
      content_type 'text/html; charset=UTF-8'
      body    '<h1>Hello</h1>'
    end
    body mail.to_s
    mail.deliver!
  end
end
