        const board = document.querySelector("#board");
        const ctx = board.getContext("2d");

            
        let color = "white";
        let lineSize = 2;
        let nn=1;
        let mm=0;
        let vartices = [];
        let edgesNahid = [];
        let selected = -1;
        const drawVartex = (e) => {
                
                for (i=0;i<vartices.length;i++)
                {
                        if((vartices[i][0]-70) <=(e.clientX-200) && (vartices[i][0]+70) >=(e.clientX-200) && (vartices[i][1]-70) <=(e.clientY) && (vartices[i][1]+70) >=(e.clientY))
                        {
                            if(selected==-1)
                            {
                                selected = vartices[i][2]-1;
                                
                            }
                            else if(selected !=i)
                            {
                                ctx.beginPath();
                                ctx.strokeStyle = "#5e81ac";
                                ctx.lineWidth = 10;
                                ctx.moveTo(vartices[selected][0], vartices[selected][1]);
                                ctx.lineTo(vartices[i][0], vartices[i][1]);
                                ctx.stroke();
                                edgesNahid.push([vartices[selected][0], vartices[selected][1],vartices[i][0], vartices[i][1],mm]);
                                mm++;

                                ctx.beginPath();
                                ctx.strokeStyle = "#5e81ac";
                                ctx.lineWidth = 10;
                                ctx.arc(vartices[i][0], vartices[i][1], 20, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.fillStyle = "#81a1c1";
                                ctx.fill();
                                ctx.font = "bold 20px Arial";
                                ctx.fillStyle = "#fff";
                                ctx.textBaseline = "middle";
                                ctx.textAlign = "center";
                                ctx.fillText(vartices[i][2], vartices[i][0], vartices[i][1]);
                                
                                ctx.beginPath();
                                ctx.strokeStyle = "#5e81ac";
                                ctx.lineWidth = 10;
                                ctx.arc(vartices[selected][0], vartices[selected][1], 20, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.fillStyle = "#81a1c1";
                                ctx.fill();
                                ctx.font = "bold 20px Arial";
                                ctx.fillStyle = "#fff";
                                ctx.textBaseline = "middle";
                                ctx.textAlign = "center";
                                ctx.fillText(vartices[selected][2], vartices[selected][0], vartices[selected][1]);
                                selected=-1;
                            }
                            return;
                        }
                }

                for (i=0;i<edgesNahid.length;i++)
                {
                    
                        let ax = edgesNahid[i][0];
                        let ay = edgesNahid[i][1];
                        let bx = edgesNahid[i][2];
                        let by = edgesNahid[i][3];
                        let ee = edgesNahid[i][4];
                        
                        let cx = e.clientX-200;
                        let cy = e.clientY;

                        ctx.beginPath();
                        ctx.moveTo(ax,ay);
                        ctx.lineTo(bx,by);
                        
                        for(var j=-11;j<=11;j++)
                        {
                            for(var k=-11;k<=11;k++)
                            {
                                if(ctx.isPointInStroke(cx+j,cy+k))
                                {
                                    ctx.strokeStyle = "#ff0000";
                                    ctx.lineWidth = 10;
                                    ctx.stroke();
                                //edgesNahid.push([vartices[selected][0], vartices[selected][1],vartices[i][0], vartices[i][1],mm]);   
                                    return;
                                }
                            }
                        }
                        
                        
                        ctx.beginPath();

                           
                }


                ctx.beginPath();
                ctx.strokeStyle = "#5e81ac";
                ctx.lineWidth = 10;
                ctx.arc(e.clientX-220, e.clientY, 20, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = "#81a1c1";
                ctx.fill();
                ctx.font = "bold 20px Arial";
                ctx.fillStyle = "#fff";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText(nn, e.clientX-220, e.clientY);
                ctx.beginPath();
                vartices.push([e.clientX-220, e.clientY,nn]);
                nn++;
                

            }
        let drawing = false;
        let xx,yy;


            const startDrawing = (e) => {
                drawing = true;
                draw(e);
            }
            const startDrawing2 = (e) => {
                
                xx = e.clientX-220; yy= e.clientY;
                ctx.beginPath();
                
            }
            const stopDrawing = () => {
                drawing = false;
                ctx.beginPath();
            }
            const stopDrawing2 = (e) => {
                ctx.lineWidth = lineSize;
                ctx.lineCap = "round";
                ctx.strokeStyle = color;
                ctx.moveTo(xx, yy);
                ctx.lineTo(e.clientX-220, e.clientY);
                ctx.stroke();
                
                ctx.beginPath();
            }

            const draw3 = (e) => {
                if (!drawing) return;


                ctx.lineWidth = lineSize;
                ctx.lineCap = "round";
                ctx.strokeStyle = color;

                ctx.lineTo(e.clientX-220, e.clientY);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(e.clientX-220, e.clientY);
            }

        window.addEventListener("load", () => {
            // resizing
            board.width = window.innerWidth-220;
            board.height = window.innerHeight;

            ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
            ctx.fillStyle = "#2e3440";
            ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
            // variables and functions
            
            // eventlisterners
            board.addEventListener("mousedown", startDrawing);
            board.addEventListener("mouseup", stopDrawing);
            board.addEventListener("mousemove", draw3);

        })

        const drawBoard = document.querySelector("#drawBoard");

        drawBoard.addEventListener("click" , () => {
            board.removeEventListener("mousedown", drawVartex);
            board.addEventListener("mousedown", startDrawing);
            

        })

        const vartex = document.querySelector("#vartex");

        vartex.addEventListener("click" , () => {
            board.removeEventListener("mousedown", startDrawing);
            board.addEventListener("mousedown", drawVartex);

        })

        const edges = document.querySelector("#edges");

        edges.addEventListener("click" , () => {
            
            board.removeEventListener("mousedown", startDrawing);
            board.removeEventListener("mousedown", drawVartex);
            board.removeEventListener("mouseup", stopDrawing);
            board.removeEventListener("mousemove", draw3);

        })

        // show settings

        const setBtn = document.querySelector(".show-settings");
        const settings = document.querySelector(".settings");

        setBtn.addEventListener("click" , () => {
            settings.classList.toggle("open-settings");
        })

        // brush colors

        const colorBtn = document.querySelector("#color-btn");

        colorBtn.addEventListener("click", () => {
            const clrCont = document.querySelector(".colors");
            clrCont.classList.toggle("colors-toggle");
        })

        const clrBtns = document.querySelectorAll(".clr");

        for (btn of clrBtns) {
            btn.addEventListener("click", (e) => {
                color = e.target.getAttribute("data-color-name");
            })
        }


        // brushes

        const brushBtn = document.querySelector("#brush-btn");

        brushBtn.addEventListener("click", () => {
            const brushCont = document.querySelector(".brush");
            brushCont.classList.toggle("brush-toggle");
        })

        const brushBtns = document.querySelectorAll(".brush-size");

        for (btn2 of brushBtns) {
            btn2.addEventListener("click", (e2) => {
                lineSize = e2.target.getAttribute("data-size");
            })
        }

        const eraser = document.querySelector("#eraser");

        eraser.addEventListener("click" , () => {
            color = "#2e3440";
        })


        // Declaring Arrays
          var adj    = [];
          var visit  = [];
          var level  = [];
          var Parent = [];
          var start  = [];
          var inhrt  = [];
          var   X    = [];
          var   Y    = [];
          var starting = 25;
          var length = window.innerWidth-190;

        //Processing Input
        function input()
        {
            

            clear_canvas();
            

            //Collect input from webpage
            var inputs = document.getElementById("input_collector").value;

            //Replace all newline with space
            inputs = inputs.replace(/\n/g, " ");
            for(var i = 0 ; i <= 100 ; i++)
            inputs = inputs.replace(/  /g, " ");
            
            
            //Taking All element into a as an array
            var   a    = inputs.split(' ').map(value => +value);
            

            var nodes = a[0];   //number of nodes
            var edges = a[1];   //number of edges

            //Innitializing Arrays
            for(var i = 0 ; i <= nodes ; i++) 
            {
                adj.push([]);
                visit.push(0);
                level.push(0);
                Parent.push(-1);
                start.push(0);
                inhrt.push(0);
                X.push(0);
                Y.push(0);
            }


            //Making Adjecency List
            for(var i = 2 ; i < 2+edges*2 ; i+=2)
            {
                var x = a[i];
                var y = a[i+1];
                adj[x].push(y);
                adj[y].push(x);
            }
            
            
            //Function calls
            bfs(1);
            
            assigny(nodes);
            drawingbfs(1,nodes);
            
        }

        function clear_canvas()
        {
            nn=1;
            ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
            ctx.fillStyle = "#2e3440";
            ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
        }
        clear_canvas();

        function clear_arrays(nodes)
        {
            for(var i = 0 ; i <= nodes ; i++) 
            {
                adj.pop();
                visit.pop();
                level.pop();
                Parent.pop();
                start.pop();
                inhrt.pop();
                X.pop();
                Y.pop();
            }
        }

        function bfs(root)
        {
            var q = [];
            q.push(root);
            visit[root]=1;
            start[root] = starting;
            X[root]= starting+ (length/2);
            inhrt[root] = length;

            while(q.length > 0)
                {
                    var par = q[0]; //Parent
                    q.shift();
                    
                    var temp =[];
                    var cldrn = 0;
                    for(var i = 0; i< adj[par].length; i++)
                        {
                             
                            var child = adj[par][i];

                            if(visit[child] == 0)
                                {
                                    visit[child]  = 1;
                                    level[child]  = level[par]+1;
                                    Parent[child] = par;
                                    cldrn++;
                                    q.push(child);
                                    temp.push(child);
                                    
                                }
                        }
                    var giv = inhrt[par] / cldrn;
                    var s = start[par];
                    for(var i = 0; i< temp.length; i++)
                        {
                            start[temp[i]] = s;
                            inhrt[temp[i]] = giv;
                            X[temp[i]] = s+ giv/2;
                            s+=giv;
                        }

                }
            
        }

        function assigny(nodes)
        {
            var mx=0;
            for(var i=0;i<=nodes;i++) if(level[i]>mx) mx= level[i];
            mx++;
            var yy = window.innerHeight/mx;
                yy /= 2;
            for(var i=0;i<=nodes;i++)
                {
                    Y[i] =( 1 + level[i]*2) *yy;
                }
        }

        function drawingbfs(root,nodes)
        {

            for(var i = 0 ; i <= nodes ; i++)  visit[i]=0;
            var q = [];
            q.push(root);
            visit[root]=1;
            
            while(q.length > 0)
                {
                    var par = q[0];
                    q.shift();
                    
                    for(var i = 0; i< adj[par].length; i++)
                        {
                             
                            var child = adj[par][i];

                            if(visit[child] == 0)
                                {
                                    visit[child]  = 1;
                                    q.push(child);
                                    draw(X[par],Y[par],X[child],Y[child],child);
                                }
                        }
                    draw(X[par],Y[par],X[par],Y[par],par);

                }
            clear_arrays(nodes);
        }



        function draw(mx,my,lx,ly,num)
        {
                my+=20;
                
                ctx.strokeStyle = "#bbb";
                ctx.lineWidth = 10;
                ctx.moveTo(mx,my);
                ctx.lineTo(lx,ly);
                ctx.stroke();
                ctx.beginPath();
                ctx.strokeStyle = "#5e81ac";
                ctx.arc(lx, ly, 25, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = "#81a1c1";
                ctx.fill();
                ctx.font = "bold 20px Arial";
                ctx.fillStyle = "#fff";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText(num, lx, ly);
                ctx.beginPath();
        }