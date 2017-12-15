require 'sinatra/base'

class App < Sinatra::Base
  get '/' do
    'Consensus'
  end
end

run App
