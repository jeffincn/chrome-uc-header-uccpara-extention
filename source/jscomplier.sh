for i in $(find . -name "*.js")
do
    filename=`echo $i | awk -F'/' '{print $2}'`
    #if [ "$filename" == "plugin_publicuser.js" || "$filename" == "plugin_publicusercontents.js" || "$filename" == "plugin_registerchannelad.js" ]
    echo compiling $filename ...
    if [ "$filename" == "background.js" ] 
    then
        
        cp ${filename} ../release/${filename}
        continue;
    fi
    java -jar compiler.jar --js=$filename --js_output_file=../release/${filename} --compilation_level SIMPLE_OPTIMIZATIONS --generate_exports
done
