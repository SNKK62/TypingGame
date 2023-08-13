module Api
    module V1
        class TestsController < ApplicationController
            def index
                render json: {name: 'taro', age: 12}
            end
        end
    end
end
