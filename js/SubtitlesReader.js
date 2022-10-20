function SubtitlesReader(subtitlesFile)
{
    this.subtitlesFile = subtitlesFile
    
    this.loadFile = function()
    {
        let fr = new FileReader()
        fr.onload = function(){
            this.subtitlesFileContents = fr.result
            this.processFile()
        }
        
        fr.readAsText(this.subtitlesFile);
    }
    
    this.processFile = function()
    {
        //TODO
    }
    
    this.getPreviousLine = function(timestamp)
    {
        
    }
    
    this.getCurrentLine = function(timestamp)
    {
        //TODO
    }
    
    this.getNextLine = function(timestamp)
    {
        //TODO
    }
    
}