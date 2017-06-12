require 'json'
require 'sinatra/base'

DATABASE = './theremostat.json'

class MyAPI < Sinatra::Base
  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  post '/' do
    file = File.open(DATABASE, 'w+')
    file << request.body.read
    file.close
  end

  get '/' do
    File.read(DATABASE)
  end
end
