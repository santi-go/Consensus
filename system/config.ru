require 'sinatra/base'

class App < Sinatra::Base
  get '/' do
    'Consensus'
  end

  get '/sendPropose' do
    "propose"
  end
end

run App
