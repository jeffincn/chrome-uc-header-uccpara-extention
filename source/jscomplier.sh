for i in $(find ./ -name "*.js")
do
    filename=`echo $i | awk -F'/' '{print $2}'`
    #if [ "$filename" == "plugin_publicuser.js" || "$filename" == "plugin_publicusercontents.js" || "$filename" == "plugin_registerchannelad.js" ]
    if [ "$filename" == "plugin_publicuser.js" ] || [ "$filename" == "plugin_publicusercontents.js" ] || [ "$filename" == "plugin_registerchannelad.js" ] || [ "$filename" == "plugin_filemanager.js" ]
    then
        echo compiling $filename ...
        java -jar compiler.jar --js=$filename --js_output_file=../$filename --compilation_level WHITESPACE_ONLY --generate_exports
        continue;
    fi
    #~/jsmin < $filename > ../$filename
    echo compiling $filename ...
    java -jar compiler.jar --js=$filename --js_output_file=../../uc_header_uccpara/${filename} --compilation_level ADVANCED_OPTIMIZATIONS --generate_exports
done
