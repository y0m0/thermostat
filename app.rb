require 'json'
require 'sinatra/base'

class MyAPI < Sinatra::Base

  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  # get '/' do
  #   erb :thermostat
  # end

  post '/' do
    # information = request.raw_post
    # data_parsed = JSONparse(information)
    puts request.body.read
    file = File.open('./sample.json', 'w+')
    file << params[:state].to_json
    file.close
  end

  get '/' do
    File.read('./sample.json')
  end

end
